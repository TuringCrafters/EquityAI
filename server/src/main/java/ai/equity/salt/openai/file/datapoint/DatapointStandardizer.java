package ai.equity.salt.openai.file.datapoint;

import ai.equity.salt.openai.model.OpenAiModelFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

import static ai.equity.salt.openai.utils.AiPromptData.DATAPOINT_EXTRACTOR_PROMPT;

@Component
@RequiredArgsConstructor
public class DatapointStandardizer {
    private final OpenAiModelFactory openAiModelFactory;

    public List<String> getFileStandardizedDataPoints(List<String> fileDataPoints) {
        return Collections.singletonList(openAiModelFactory.createDefaultChatModel()
                .generate(DATAPOINT_EXTRACTOR_PROMPT + fileDataPoints));
    }
}

