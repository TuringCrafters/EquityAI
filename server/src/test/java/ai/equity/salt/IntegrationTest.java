package ai.equity.salt;

import dev.langchain4j.model.openai.OpenAiLanguageModel;
import dev.langchain4j.model.language.LanguageModel;
import dev.langchain4j.model.output.Response;
import dev.langchain4j.model.output.TokenUsage;
import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.Test;

import static dev.langchain4j.model.output.FinishReason.STOP;
import static org.assertj.core.api.Assertions.assertThat;

public class IntegrationTest {

   // private final OpenAiProperties properties;

   // public IntegrationTest(OpenAiProperties properties) {
        //this.properties = properties;
    //}

    Dotenv dotenv = Dotenv.load();
    LanguageModel model = OpenAiLanguageModel.builder()
            .apiKey(dotenv.get("OPENAI_API_KEY"))
            //.organizationId(System.getenv("OPENAI_ORGANIZATION_ID"))
            .logRequests(true)
            .logResponses(true)
            .build();

    @Test
    void should_generate_answer_and_return_token_usage_and_finish_reason_stop() {

        String prompt = "What is the capital of Germany?";

        Response<String> response = model.generate(prompt);
        System.out.println(response);

        assertThat(response.content()).contains("Berlin");

        TokenUsage tokenUsage = response.tokenUsage();
        assertThat(tokenUsage.inputTokenCount()).isEqualTo(7);
        assertThat(tokenUsage.outputTokenCount()).isGreaterThan(0);
        assertThat(tokenUsage.totalTokenCount())
                .isEqualTo(tokenUsage.inputTokenCount() + tokenUsage.outputTokenCount());

        assertThat(response.finishReason()).isEqualTo(STOP);
    }
}