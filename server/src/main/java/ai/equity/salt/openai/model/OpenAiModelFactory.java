package ai.equity.salt.openai.model;

import ai.equity.salt.openai.OpenAiProperties;
import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.model.openai.OpenAiLanguageModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static dev.langchain4j.model.openai.OpenAiModelName.GPT_3_5_TURBO_1106;

@Component
@RequiredArgsConstructor
public class OpenAiModelFactory {

    private final OpenAiProperties properties;

    public OpenAiLanguageModel create() {
        return OpenAiLanguageModel.builder()
                .apiKey(properties.key())
                .logRequests(true)
                .logResponses(true)
                .build();
    }
    public OpenAiChatModel createDefaultChatModel() {
        return OpenAiChatModel.builder()
                .modelName(GPT_3_5_TURBO_1106)
                .apiKey(properties.key())
                .maxTokens(1024)
                .temperature(0.0)
                .topP(0.0)
                .logRequests(true)
                .logResponses(true)
                .build();
    }
}
