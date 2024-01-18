package ai.equity.salt.openai.service;

import ai.equity.salt.openai.controller.dto.*;
import ai.equity.salt.openai.model.EquityAi;
import ai.equity.salt.openai.model.OpenAiModelFactory;
import ai.equity.salt.openai.repository.JpaEquityAiRepo;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class EquityAiService {

    private final OpenAiModelFactory openAiModelFactory;

    private final JpaEquityAiRepo repository;
    private static final String SYSTEM_MESSAGE = """
            Analyze the provided dataset, which includes positions, salaries, age, and locality to identify significant discrepancies. Focus on:
            -Any unexpected patterns or outliers.
            -Any discrepancies within the data.
            -Point out if similar positions, years of experience and locality with similar job complexity have different salaries
            Highlight and explain any noteworthy discrepancies beyond these areas. Ensure your analysis is thorough and accounts for possible contributing factors to these disparities.
            Provide the result in plain english. Make sure the answer is in layman's terms""";
    private static final String DATA_HEADER = "Positions, Salaries, Experience, Age, Locality\n";

    public String getAiResponse(String prompt) {
        String response = openAiModelFactory.create().generate(prompt).content();
        repository.save(new EquityAi(prompt, response));
        return response;
    }

    public EquityAiResponse analyzeFile(MultipartFile file) throws IOException, CsvValidationException {
        var inputStream = file.getInputStream();
        List<JobDataSet> jobDataList = readCSV(inputStream);

        var jobTitles = findUniqueJobs(jobDataList);
        var uniqueJobTitles = new HashSet<>(jobTitles);

        String mostCommonJob = mostCommonJob(jobTitles);

        List<SalaryByYearsOfExperienceDatapoint> experienceDataPoints = calculateAverageForYearsOfExperience(jobDataList, mostCommonJob);
        List<SalaryByLocationDatapoint> locationDataPoints = calculateAverageForLocation(jobDataList, mostCommonJob);

//        var response = openAiModelFactory.createDefaultChatModel().generate(SYSTEM_MESSAGE + createPrompt(jobDataList));
        return new EquityAiResponse("null", uniqueJobTitles, mostCommonJob, experienceDataPoints, locationDataPoints);
    }

    private static List<JobDataSet> readCSV(InputStream inputStream) throws IOException, CsvValidationException {
        List<JobDataSet> jobDataList = new ArrayList<>();

        try (CSVReader csvReader = new CSVReader((new InputStreamReader(inputStream, StandardCharsets.UTF_8)))) {
            csvReader.readNext();

            String[] nextRecord;
            while ((nextRecord = csvReader.readNext()) != null) {
                if (nextRecord.length < 5) {
                    continue;
                }
                JobDataSet jobData = new JobDataSet();
                jobData.setPosition(nextRecord[0]);
                jobData.setSalary(Double.parseDouble(nextRecord[1]));
                jobData.setExperience(Integer.parseInt(nextRecord[2]));
                jobData.setAge(Integer.parseInt(nextRecord[3]));
                jobData.setLocality(nextRecord[4]);

                jobDataList.add(jobData);
            }
        }
        return jobDataList;
    }

    private static String createPrompt(List<JobDataSet> jobDataList) {
        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append(DATA_HEADER);

        for (JobDataSet jobData : jobDataList) {
            stringBuilder.append(jobData.toString()).append("\n");
        }
        return stringBuilder.toString();
    }

    private List<String> findUniqueJobs(List<JobDataSet> jobDataList) {
        Set<String> uniqueJobTitles = new HashSet<>();

        for (JobDataSet jobData : jobDataList) {
            String jobTitle = jobData.getPosition();
            if (jobTitle != null && !jobTitle.isEmpty()) {
                uniqueJobTitles.add(jobTitle);
            }
        }
        return new ArrayList<>(uniqueJobTitles);
    }

    private String mostCommonJob(List<String> jobTitles) {
        return jobTitles
                .stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);
    }

    private List<SalaryByYearsOfExperienceDatapoint> calculateAverageForYearsOfExperience(List<JobDataSet> jobDataList, String mostCommonJob) {
        Map<Integer, List<Double>> averageSalaryByExperience = jobDataList.stream()
                .filter(data -> data.getPosition().equals(mostCommonJob))
                .collect(Collectors.groupingBy(
                        JobDataSet::getExperience,
                        Collectors.mapping(JobDataSet::getSalary, Collectors.toList())
                ));

        return averageSalaryByExperience.entrySet().stream()
                .map(entry -> {
                    List<Double> salaries = entry.getValue();
                    double average = calculateAverage(salaries);
                    double standardDeviation = calculateStandardDeviation(salaries, average);

                    double aboveAverage = findAboveAverage(salaries, average, standardDeviation);
                    double belowAverage = findBelowAverage(salaries, average, standardDeviation);

                    return new SalaryByYearsOfExperienceDatapoint(
                            entry.getKey(),
                            new SalaryRangeDatapoint(
                                    (double) Math.round(average * 100) / 100,
                                    aboveAverage,
                                    belowAverage
                            )
                    );
                })
                .toList();
    }

    private List<SalaryByLocationDatapoint> calculateAverageForLocation(List<JobDataSet> jobDataList, String mostCommonJob) {
        Map<String, List<Double>> averageSalaryByLocation = jobDataList.stream()
                .filter(data -> data.getPosition().equals(mostCommonJob))
                .collect(Collectors.groupingBy(
                        JobDataSet::getLocality,
                        Collectors.mapping(JobDataSet::getSalary, Collectors.toList())
                ));

        return averageSalaryByLocation.entrySet().stream()
                .map(entry -> {
                    List<Double> salaries = entry.getValue();
                    double average = calculateAverage(salaries);
                    double standardDeviation = calculateStandardDeviation(salaries, average);

                    double aboveAverage = findAboveAverage(salaries, average, standardDeviation);
                    double belowAverage = findBelowAverage(salaries, average, standardDeviation);

                    return new SalaryByLocationDatapoint(
                            entry.getKey(),
                            new SalaryRangeDatapoint(
                                    (double) Math.round(average * 100) / 100,
                                    aboveAverage,
                                    belowAverage
                            )
                    );
                })
                .toList();
    }

    private double calculateAverage(List<Double> salaries) {
        return salaries.stream().mapToDouble(Double::doubleValue).average().orElse(0);
    }

    private double calculateStandardDeviation(List<Double> salaries, double mean) {
        double sumOfSquares = salaries.stream()
                .mapToDouble(salary -> Math.pow(salary - mean, 2))
                .sum();
        return Math.sqrt(sumOfSquares / salaries.size());
    }

    private double findAboveAverage(List<Double> salaries, double average, double standardDeviation) {
        return salaries.stream()
                .filter(salary -> salary > average + standardDeviation)
                .max(Double::compare)
                .orElse(average);
    }

    private double findBelowAverage(List<Double> salaries, double average, double standardDeviation) {
        return salaries.stream()
                .filter(salary -> salary < average - standardDeviation)
                .min(Double::compare)
                .orElse(average);
    }
}
