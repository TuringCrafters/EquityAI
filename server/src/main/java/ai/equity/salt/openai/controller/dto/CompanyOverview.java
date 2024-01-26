package ai.equity.salt.openai.controller.dto;

import java.util.List;

public record CompanyOverview(
        List<JobDataSet> topFiveHighestPayingPositions,
        int totalNumberOfEmployees,
        int averageAge,
        int averageTenure,
        int averageSalary
) {
}
