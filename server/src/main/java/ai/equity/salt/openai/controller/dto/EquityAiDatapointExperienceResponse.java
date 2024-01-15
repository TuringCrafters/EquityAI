package ai.equity.salt.openai.controller.dto;

public record EquityAiDatapointExperienceResponse(
        String jobTitle,
        EquityAiYearsOfExperience[] yearsOfExperience
) {
}
