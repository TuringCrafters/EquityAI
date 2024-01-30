package ai.equity.salt.openai.controller.dto;

import java.util.List;

public record EquityAiResponse(
        String response,
        String productRecommendation,
        List<String> uniqueJobTitles,
        String jobTitle,
        List<SalaryDatapoint<Integer>> experienceDetails,
        List<SalaryDatapoint<String>> locationDetails,
        String genderPayGap,
        CompanyOverview companyOverview
) {
}
