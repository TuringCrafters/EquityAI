package ai.equity.salt.openai.utils;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.controller.dto.SalaryDatapoint;
import ai.equity.salt.openai.controller.dto.SalaryRangeDatapoint;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.function.UnaryOperator.identity;

public class DataAnalysis {

    private DataAnalysis() {
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


    public static double round(double number) {
        return (double) Math.round(number * 100) / 100;
    }
}