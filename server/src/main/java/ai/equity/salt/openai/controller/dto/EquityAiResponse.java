package ai.equity.salt.openai.controller.dto;

import java.util.Set;

public record EquityAiResponse(
        String response,
        Set<String> uniqueJobTitles,
        EquityAiDatapointExperienceResponse datapointExperience
) {
}
