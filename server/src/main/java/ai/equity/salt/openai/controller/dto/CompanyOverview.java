package ai.equity.salt.openai.controller.dto;

import java.util.List;

public record CompanyOverview(
        List<JobDataSet> topFiveHighestPayingPositions,
        long totalNumberOfEmployees
) {
}
