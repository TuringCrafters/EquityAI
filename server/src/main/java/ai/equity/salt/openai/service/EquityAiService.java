package ai.equity.salt.openai.service;

import ai.equity.salt.openai.controller.dto.EquityAiJobData;
import ai.equity.salt.openai.controller.dto.EquityAiResponse;
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
        List<EquityAiJobData> jobDataList = readCSV(inputStream);

        var jobTitles = findUniqueJobs(jobDataList);
        var uniqueJobTitles = new HashSet<>(jobTitles);

        String mostCommonJob = mostCommonJob(jobTitles);

        var response = openAiModelFactory.createDefaultChatModel().generate(SYSTEM_MESSAGE + createPrompt(jobDataList));
        return new EquityAiResponse(response, uniqueJobTitles, null);
    }

    private static List<EquityAiJobData> readCSV(InputStream inputStream) throws IOException, CsvValidationException {
        List<EquityAiJobData> jobDataList = new ArrayList<>();

        try (CSVReader csvReader = new CSVReader((new InputStreamReader(inputStream, StandardCharsets.UTF_8)))) {
            csvReader.readNext();

            String[] nextRecord;
            while ((nextRecord = csvReader.readNext()) != null) {
                if (nextRecord.length < 5) {
                    continue;
                }
                EquityAiJobData jobData = new EquityAiJobData();
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

    private static String createPrompt(List<EquityAiJobData> jobDataList) {
        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append(DATA_HEADER);

        for (EquityAiJobData jobData : jobDataList) {
            stringBuilder.append(jobData.toString()).append("\n");
        }
        return stringBuilder.toString();
    }

    private List<String> findUniqueJobs(List<EquityAiJobData> jobDataList) {
        Set<String> uniqueJobTitles = new HashSet<>();

        for (EquityAiJobData jobData : jobDataList) {
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
}