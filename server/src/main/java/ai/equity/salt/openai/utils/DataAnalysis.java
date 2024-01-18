package ai.equity.salt.openai.utils;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.controller.dto.SalaryByLocationDatapoint;
import ai.equity.salt.openai.controller.dto.SalaryByYearsOfExperienceDatapoint;
import ai.equity.salt.openai.controller.dto.SalaryRangeDatapoint;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class DataAnalysis {

    public static double calculateAverage(List<Double> salaries) {
        return salaries.stream().mapToDouble(Double::doubleValue).average().orElse(0);
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

    public static List<SalaryByYearsOfExperienceDatapoint> calculateAverageForYearsOfExperience(List<JobDataSet> jobDataList, String mostCommonJob) {
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

    public static List<SalaryByLocationDatapoint> calculateAverageForLocation(List<JobDataSet> jobDataList, String mostCommonJob) {
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
}