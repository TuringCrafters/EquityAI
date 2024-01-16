package ai.equity.salt.openai.service;

import ai.equity.salt.openai.controller.dto.EquityAiResponse;
import ai.equity.salt.openai.model.EquityAi;
import ai.equity.salt.openai.model.OpenAiModelFactory;
import ai.equity.salt.openai.repository.JpaEquityAiRepo;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.opencsv.CSVReaderHeaderAware;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class EquityAiService {

    private static final String SYSTEM_MESSAGE = """
            Analyze the provided dataset, which includes positions, salaries, age, and locality to identify significant discrepancies. Focus on:
            -Any unexpected patterns or outliers.
            -Any discrepancies within the data.
            -Point out if similar positions, years of experience and locality with similar job complexity have different salaries
            Highlight and explain any noteworthy discrepancies beyond these areas. Ensure your analysis is thorough and accounts for possible contributing factors to these disparities.
            Provide the result in plain english. Make sure the answer is in layman's terms""";
    private final OpenAiModelFactory openAiModelFactory;
    private final JpaEquityAiRepo repository;

    public String getAiResponse(String prompt) {

        String response = openAiModelFactory.create().generate(prompt).content();
        repository.save(new EquityAi(prompt, response));
        return response;
    }

    public EquityAiResponse analyzeFile(MultipartFile file) throws IOException {
        var inputStream = file.getInputStream();
        var jobTitles = findUniqueJobs(inputStream);
        var uniqueJobTitles = new HashSet<>(jobTitles);

        String mostCommonJob = mostCommonJob(jobTitles);

        log.info("Unique jobs: " + uniqueJobTitles);
        log.info("Most common job: " + mostCommonJob);

        var fileData = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))
                .lines()
                .collect(Collectors.joining());

        var response = openAiModelFactory.createDefaultChatModel().generate(SYSTEM_MESSAGE + fileData);
        log.info("Response: " + response);
        return new EquityAiResponse(response, uniqueJobTitles, null);
    }

    private List<String> findUniqueJobs(InputStream inputStream) {
        try (CSVReaderHeaderAware reader = new CSVReaderHeaderAware(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            List<String> jobTitles = new ArrayList<>();
            Map<String, String> values;

            while ((values = reader.readMap()) != null) {
                String jobTitle = values.get("Positions");
                if (jobTitle != null && !jobTitle.isEmpty()) {
                    jobTitles.add(jobTitle);
                }
            }
            return jobTitles;
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private String mostCommonJob(List<String> jobTitles) {
        return jobTitles
                .stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);
    }
}