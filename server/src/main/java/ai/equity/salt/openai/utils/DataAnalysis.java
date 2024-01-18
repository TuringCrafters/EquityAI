package ai.equity.salt.openai.utils;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.controller.dto.SalaryDatapoint;
import ai.equity.salt.openai.controller.dto.SalaryRangeDatapoint;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
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
                    double average = calculateAverage(salaries);
                    double standardDeviation = calculateStandardDeviation(salaries, average);

                    double aboveAverage = findAboveAverage(salaries, average, standardDeviation);
                    double belowAverage = findBelowAverage(salaries, average, standardDeviation);

                    return new SalaryDatapoint<>(
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