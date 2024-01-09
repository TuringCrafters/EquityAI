package ai.equity.salt.openai.service;

import ai.equity.salt.openai.OpenAiProperties;
import ai.equity.salt.openai.model.EquityAi;
import ai.equity.salt.openai.repository.JpaEquityAiRepo;
import dev.langchain4j.model.language.LanguageModel;
import dev.langchain4j.model.openai.OpenAiLanguageModel;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EquityAiService {

    Dotenv dotenv = Dotenv.load();
//    private final OpenAiProperties properties;
    private final LanguageModel model = OpenAiLanguageModel.builder()
            .apiKey(dotenv.get("OPENAI_API_KEY"))
            .logRequests(true)
            .logResponses(true)
            .build();


    private final JpaEquityAiRepo repository;
    public String getAiResponse(String prompt) {

       // String prompt = "What is the capital of Germany?";
        String response = model.generate(prompt).content();
        repository.save(new EquityAi(prompt, response));
        return response;
    }
}
