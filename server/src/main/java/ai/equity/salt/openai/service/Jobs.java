package ai.equity.salt.openai.service;


import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.controller.dto.SalaryDatapoint;
import ai.equity.salt.openai.controller.dto.SalaryRangeDatapoint;
import ai.equity.salt.openai.file.reader.implementation.CsvFileReader;
import ai.equity.salt.openai.file.reader.implementation.XlsxFileReader;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import static ai.equity.salt.openai.utils.DataAnalysis.*;
import static java.util.function.UnaryOperator.identity;


@Service
@Slf4j
@Getter
public class Jobs {

    private final List<JobDataSet> data;
    private final CsvFileReader csvFileReader = new CsvFileReader();
    private final XlsxFileReader xlsxFileReader = new XlsxFileReader();


    private Jobs(List<JobDataSet> jobDataSets) {
        this.data = jobDataSets;
    }

    public static Jobs from(List<JobDataSet> jobDataSet) {
        return new Jobs(jobDataSet);
    }


    public JobsStatistics getStatistics() {
        var age = data.stream().collect(Collectors.summarizingInt(JobDataSet::getAge));
        var salary = data.stream().collect(Collectors.summarizingDouble(JobDataSet::getSalary));
        var tenure = data.stream().collect(Collectors.summarizingInt(JobDataSet::getExperience));

        return new JobsStatistics(age, salary, tenure);
    }

    public List<JobDataSet> getTopFiveHighestPayingPositions() {
        return data.stream().sorted(Comparator.comparing(JobDataSet::getSalary)
                .reversed()).limit(5).toList();
    }

    public List<String> toListString() {
        return data.stream().map(JobDataSet::toString).toList();
    }

    public List<String> uniqueTitles() {
        Set<String> uniqueJobTitles = new HashSet<>();

        for (JobDataSet jobData : data) {
            String jobTitle = jobData.getPosition();
            if (jobTitle != null && !jobTitle.isEmpty()) {
                uniqueJobTitles.add(jobTitle);
            }
        }
        return new ArrayList<>(uniqueJobTitles);
    }

    public Map<String, Long> calculateGenderRatio() {
        return data.stream().collect(Collectors.groupingBy(JobDataSet::getGender, Collectors.counting()));
    }

    public Double calculateGenderPayGap() {

        Map<String, Double> genderAverageSalary = data.stream()
                .collect(Collectors.groupingBy(JobDataSet::getGender,
                        Collectors.averagingDouble(JobDataSet::getSalary)));

        double maleAverageSalary = genderAverageSalary.getOrDefault("Male", 0.0);
        double femaleAverageSalary = genderAverageSalary.getOrDefault("Female", 0.0);

        return ((maleAverageSalary - femaleAverageSalary) / femaleAverageSalary);
    }

    public  <T> List<SalaryDatapoint<T>> averageSalaryByDatapoint( String mostCommonJob, Function<JobDataSet, T> getBydataPointFunction) {
        Map<T, List<Double>> averageSalaryByDatapoint = data.stream()
                .filter(d -> d.getPosition().equals(mostCommonJob))
                .collect(Collectors.groupingBy(
                        getBydataPointFunction,
                        Collectors.mapping(JobDataSet::getSalary, Collectors.toList())
                ));

        return averageSalaryByDatapoint.entrySet().stream()
                .map(entry -> {
                    List<Double> salaries = entry.getValue();
                    T datapoint = entry.getKey();
                    double average = calculateAverage(salaries);
                    double standardDeviation = calculateStandardDeviation(salaries, average);

                    double aboveAverage = findAboveAverage(salaries, average, standardDeviation);
                    double belowAverage = findBelowAverage(salaries, average, standardDeviation);

                    return new SalaryDatapoint<>(datapoint, new SalaryRangeDatapoint(average, aboveAverage, belowAverage));
                })
                .toList();
    }

    public String mostCommonJob() {
        return data.stream()
                .map(JobDataSet::getPosition)
                .collect(Collectors.groupingBy(identity(), Collectors.counting()))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);
    }

}
