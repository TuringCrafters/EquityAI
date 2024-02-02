package ai.equity.salt.openai.utils;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.controller.dto.SalaryDatapoint;
import ai.equity.salt.openai.controller.dto.SalaryRangeDatapoint;
import lombok.NoArgsConstructor;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.function.UnaryOperator.identity;

public class DataAnalysis {

    public DataAnalysis() {
    }

    public static double calculateAverage(List<Double> salaries) {
        return round(salaries.stream().mapToDouble(Double::doubleValue).average().orElse(0));
    }

    public static double calculateStandardDeviation(List<Double> salaries, double mean) {
        double sumOfSquares = salaries.stream()
                .mapToDouble(salary -> Math.pow(salary - mean, 2))
                .sum();
        return Math.sqrt(sumOfSquares / salaries.size());
    }

    public static double findAboveAverage(List<Double> salaries, double average, double standardDeviation) {
        return salaries.stream()
                .filter(salary -> salary > average + standardDeviation)
                .max(Double::compare)
                .orElse(average);
    }

    public static double findBelowAverage(List<Double> salaries, double average, double standardDeviation) {
        return salaries.stream()
                .filter(salary -> salary < average - standardDeviation)
                .min(Double::compare)
                .orElse(average);
    }

    public static <T> List<SalaryDatapoint<T>> averageSalaryByDatapoint(List<JobDataSet> jobDataList, String mostCommonJob, Function<JobDataSet, T> getBydataPointFunction) {
        Map<T, List<Double>> averageSalaryByDatapoint = jobDataList.stream()
                .filter(data -> data.getPosition().equals(mostCommonJob))
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

    public static List<String> findUniqueJobs(List<JobDataSet> jobDataList) {
        Set<String> uniqueJobTitles = new HashSet<>();

        for (JobDataSet jobData : jobDataList) {
            String jobTitle = jobData.getPosition();
            if (jobTitle != null && !jobTitle.isEmpty()) {
                uniqueJobTitles.add(jobTitle);
            }
        }
        return new ArrayList<>(uniqueJobTitles);
    }

    public static String mostCommonJob(List<JobDataSet> jobDataSetList) {
        return jobDataSetList.stream()
                .map(JobDataSet::getPosition)
                .collect(Collectors.groupingBy(identity(), Collectors.counting()))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);
    }

    public static Double calculateGenderPayGap(List<JobDataSet> jobDataList) {

        Map<String, Double> genderAverageSalary = jobDataList.stream()
                .collect(Collectors.groupingBy(JobDataSet::getGender,
                        Collectors.averagingDouble(JobDataSet::getSalary)));

        double maleAverageSalary = genderAverageSalary.getOrDefault("Male", 0.0);
        double femaleAverageSalary = genderAverageSalary.getOrDefault("Female", 0.0);

        return ((maleAverageSalary - femaleAverageSalary) / femaleAverageSalary);
    }

    public static Map<String, Long> calculateGenderRatio(List<JobDataSet> jobDataList) {
        return jobDataList.stream().collect(Collectors.groupingBy(JobDataSet::getGender, Collectors.counting()));
    }

    public static double round(double number) {
        return (double) Math.round(number * 100) / 100;
    }
}