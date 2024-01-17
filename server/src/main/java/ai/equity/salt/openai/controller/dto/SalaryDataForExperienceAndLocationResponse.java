package ai.equity.salt.openai.controller.dto;

import java.util.List;

public record SalaryDataForExperienceAndLocationResponse(
        String jobTitle,
        List<SalaryByYearsOfExperienceDatapoint> experienceDetails,
        List<SalaryByLocationDatapoint> locationDetail
) {
}
