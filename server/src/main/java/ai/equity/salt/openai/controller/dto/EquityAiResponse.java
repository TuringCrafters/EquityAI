package ai.equity.salt.openai.controller.dto;

import java.util.List;
import java.util.Set;

public record EquityAiResponse(
        String response,
        Set<String> uniqueJobTitles,
        String jobTitle,
        List<SalaryByYearsOfExperienceDatapoint> experienceDetails,
        List<SalaryByLocationDatapoint> locationDetails
) {
}
