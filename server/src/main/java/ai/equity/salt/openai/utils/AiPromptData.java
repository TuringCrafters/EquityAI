package ai.equity.salt.openai.utils;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import lombok.NoArgsConstructor;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

public class AiPromptData {

    public AiPromptData() {
    }

    public static final String SALARY_ANALYSIS_PROMPT = """
            Analyze the provided dataset, which includes positions, salaries, age, and locality to identify significant discrepancies. Focus on:
            -Any unexpected patterns or outliers.
            -Any discrepancies within the data.
            -Point out if similar positions, years of experience and locality with similar job complexity have different salaries
            Highlight and explain any noteworthy discrepancies beyond these areas. Ensure your analysis is thorough and accounts for possible contributing factors to these disparities.
            Provide the result in plain english. Make sure the answer is in layman's terms""";
    public static final String DATA_HEADER = "Positions, Salaries, Experience, Age, Locality\n";

    public static final String SYSARB_PRODUCTS = """
            Sysarb products:\s
            Pay Equity Analysis: Explore our groundbreaking AI-powered Pay Equity module.
            Salary Review: Optimize your Salary review & performance management process.
            Pay Equity Consulting: Our Pay Equity experts will support you through your fair pay journey.
            Job architecture: Elevate your workforce with our Job Architecture Framework.
            Benchmark Analytics: Gain a deeper understanding of your compensation structures.
            """;

    public static final String PRODUCT_RECOMMENDATION_PROMPT = """
            Based on the analysis, recommend one of the Sysarb products to me.
            """;

    public static final String DATAPOINT_EXTRACTOR_PROMPT = """
            Reply as a json Object with the following fields
                String position,
                number salary,
                number experience,
                number age,
                number locality,
            Based on the following list, replace the headers where suitable;

            """;

    public static List<String> datapointFields() {

        return Arrays.stream(JobDataSet.class.getDeclaredFields())
                .map(Field::getName).toList();
    }
}
