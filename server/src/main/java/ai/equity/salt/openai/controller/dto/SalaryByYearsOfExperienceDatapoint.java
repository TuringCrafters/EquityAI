package ai.equity.salt.openai.controller.dto;

public record SalaryByYearsOfExperienceDatapoint(
        int yearsOfExperience,
        SalaryRangeDatapoint salary
) {
}
