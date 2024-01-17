package ai.equity.salt.openai.controller.dto;

public record SalaryRangeDatapoint(
        double average,
        double aboveAverage,
        double belowAverage
) {
}
