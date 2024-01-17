package ai.equity.salt.openai.controller.dto;

public record SalaryByLocationDatapoint(
        String location,
        SalaryRangeDatapoint salary
) {
}
