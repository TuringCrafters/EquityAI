package ai.equity.salt;

import dev.langchain4j.model.openai.OpenAiLanguageModel;
import dev.langchain4j.model.language.LanguageModel;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertThrows;

class OpenAiApiTest {

    private static final String FAKE_API_KEY = "asdfghjkl";

    LanguageModel modelNoApiKey = OpenAiLanguageModel.builder()
            .apiKey(FAKE_API_KEY)
            .logRequests(true)
            .logResponses(true)
            .build();

    @Test
    void testExceptionMessage() {
        String prompt = "What is the capital of Germany?";
        Exception exception = assertThrows(RuntimeException.class, () -> {
            modelNoApiKey.generate(prompt);
        });

        String expectedMessage = "Incorrect API key provided: " + FAKE_API_KEY +
                ". You can find your API key at https://platform.openai.com/account/api-keys.";
        String actualMessage = exception.getMessage();
        Assertions.assertTrue(actualMessage.contains(expectedMessage));
    }
}