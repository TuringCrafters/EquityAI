package ai.equity.salt.openai.service;

import java.util.DoubleSummaryStatistics;
import java.util.IntSummaryStatistics;

public record JobsStatistics(
        IntSummaryStatistics age,
        DoubleSummaryStatistics salary,
        IntSummaryStatistics tenure
) {
}
