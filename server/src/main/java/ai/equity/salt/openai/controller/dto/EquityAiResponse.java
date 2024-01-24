package ai.equity.salt.openai.controller.dto;

import java.util.List;
import java.util.Set;

public record EquityAiResponse(
        String response,
        String productRecommendation,
        Set<String> uniqueJobTitles,
        String jobTitle,
        List<SalaryDatapoint<Integer>> experienceDetails,
        List<SalaryDatapoint<String>> locationDetails
) {
}
