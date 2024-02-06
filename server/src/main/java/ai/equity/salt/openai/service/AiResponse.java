package ai.equity.salt.openai.service;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.model.OpenAiModelFactory;
import org.springframework.stereotype.Component;

import java.util.List;

import static ai.equity.salt.openai.utils.AiPromptData.*;
import static ai.equity.salt.openai.utils.AiPromptData.SYSARB_PRODUCTS;

@Component
public class AiResponse {

    private final OpenAiModelFactory openAiModelFactory;

    public AiResponse(OpenAiModelFactory openAiModelFactory) {
        this.openAiModelFactory = openAiModelFactory;
    }

    public String generateResponse(List<JobDataSet> jobDataList){
        return openAiModelFactory.createDefaultChatModel().generate(SALARY_ANALYSIS_PROMPT +
                createPrompt(jobDataList));
    }

    public String generateRecommendation(String response){
        return openAiModelFactory.createDefaultChatModel().generate(response +
                PRODUCT_RECOMMENDATION_PROMPT + SYSARB_PRODUCTS);
    }

}
