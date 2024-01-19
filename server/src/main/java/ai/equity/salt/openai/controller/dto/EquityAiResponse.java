package ai.equity.salt.openai.controller.dto;

import java.util.List;
import java.util.Set;

public record EquityAiResponse<T, R>(
        String response,
        String productRecommendation,
        Set<String> uniqueJobTitles,
        String jobTitle,
        List<SalaryDatapoint<T>> experienceDetails,
        List<SalaryDatapoint<R>> locationDetails
) {
}
