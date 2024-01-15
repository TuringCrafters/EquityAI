package ai.equity.salt.openai.service;

import ai.equity.salt.openai.model.EquityAi;
import ai.equity.salt.openai.model.OpenAiModelFactory;
import ai.equity.salt.openai.repository.JpaEquityAiRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class EquityAiService {

    private final OpenAiModelFactory openAiModelFactory;

    private final JpaEquityAiRepo repository;

    private final String SYSTEM_MESSAGE = "Analyze the provided dataset, which includes positions, salaries, age, " +
            "and locality, to identify significant discrepancies. Focus on:\n" +
            "\n" +
            "Salary differences within the same positions.\n" +
            "Salary distribution variations across localities.\n" +
            "Age-related disparities in salaries and positions.\n" +
            "Any unexpected patterns or outliers.\n" +
            "\n" +
            "Use statistical measures and visualizations to support your findings. " +
            "Highlight and explain any noteworthy discrepancies beyond these areas. " +
            "Ensure your analysis is thorough and accounts for possible contributing factors to these disparities.\n" +
            "Provide the result in plain english.";

    public String getAiResponse(String prompt) {

        String response = openAiModelFactory.create().generate(prompt).content();
        repository.save(new EquityAi(prompt, response));
        return response;
    }

    public String analyzeFile(MultipartFile file) throws IOException {
        var inputStream = file.getInputStream();

        var fileData = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                .lines()
                .collect(Collectors.joining());

        log.info("This is the logged data: " + fileData);

        var response =  openAiModelFactory.create()
                .generate(SYSTEM_MESSAGE + fileData);

        log.info(String.valueOf(response.tokenUsage()));

        return response.content();
    }




}