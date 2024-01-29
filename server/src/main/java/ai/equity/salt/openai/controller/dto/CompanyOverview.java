package ai.equity.salt.openai.controller.dto;

import java.util.List;
import java.util.Map;

public record CompanyOverview(
        List<JobDataSet> topFiveHighestPayingPositions,
        int totalNumberOfEmployees,
        Map<String, Long> genderRatio,
        int averageAge,
        int averageTenure,
        int averageSalary
) {
}
