package ai.equity.salt.openai.controller.dto;

import java.util.List;

public record EquityAiDatapointExperienceResponse(
        String jobTitle,
        List<EquityAiYearsOfExperience> yearsOfExperience
) {
}
