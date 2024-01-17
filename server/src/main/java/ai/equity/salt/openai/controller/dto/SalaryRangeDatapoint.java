package ai.equity.salt.openai.controller.dto;

public record SalaryRangeDatapoint(
        int average,
        int aboveAverage,
        int belowAverage
) {
}
