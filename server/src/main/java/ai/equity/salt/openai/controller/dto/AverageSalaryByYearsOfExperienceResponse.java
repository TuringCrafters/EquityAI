package ai.equity.salt.openai.controller.dto;

import java.util.List;

public record AverageSalaryByYearsOfExperienceResponse(
        String jobTitle,
        List<SalaryByYearsOfExperienceDatapoint> experienceDetails
) {
}
