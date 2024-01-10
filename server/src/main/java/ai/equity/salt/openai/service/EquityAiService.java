package ai.equity.salt.openai.service;

import ai.equity.salt.openai.model.EquityAi;
import ai.equity.salt.openai.model.OpenAiModelFactory;
import ai.equity.salt.openai.repository.JpaEquityAiRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EquityAiService {

    private final OpenAiModelFactory openAiModelFactory;

    private final JpaEquityAiRepo repository;
    public String getAiResponse(String prompt) {

       // String prompt = "What is the capital of Germany?";
        String response = model.generate(prompt).content();
        repository.save(new EquityAi(prompt, response));
        return response;
    }
}
