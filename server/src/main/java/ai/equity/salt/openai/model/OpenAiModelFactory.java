package ai.equity.salt.openai.model;

import ai.equity.salt.openai.OpenAiProperties;
import dev.langchain4j.model.openai.OpenAiLanguageModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

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
}
