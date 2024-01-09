package ai.equity.salt;

import dev.langchain4j.model.openai.OpenAiChatModel;


import dev.langchain4j.model.language.LanguageModel;
import dev.langchain4j.model.output.Response;
import dev.langchain4j.model.output.TokenUsage;
import org.junit.jupiter.api.Test;

import static dev.langchain4j.model.output.FinishReason.STOP;
import static org.assertj.core.api.Assertions.assertThat;


public class IntegrationTest {

    LanguageModel model = OpenAiLanguageModel.builder()
            .apiKey(System.getenv("OPENAI_API_KEY"))
            .organizationId(System.getenv("OPENAI_ORGANIZATION_ID"))
            .logRequests(true)
            .logResponses(true)
            .build();


}