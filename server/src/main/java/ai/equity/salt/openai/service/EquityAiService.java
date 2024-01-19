package ai.equity.salt.openai.service;

import ai.equity.salt.openai.controller.dto.EquityAiResponse;
import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.controller.dto.SalaryDatapoint;
import ai.equity.salt.openai.model.EquityAi;
import ai.equity.salt.openai.model.OpenAiModelFactory;
import ai.equity.salt.openai.repository.JpaEquityAiRepo;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static ai.equity.salt.openai.utils.AiPromptData.*;
import static ai.equity.salt.openai.utils.DataAnalysis.*;
import static ai.equity.salt.openai.utils.FileReader.readCSV;

@Service
@RequiredArgsConstructor
@Slf4j
public class EquityAiService {

    private final OpenAiModelFactory openAiModelFactory;

    private final JpaEquityAiRepo repository;

    public String getAiResponse(String prompt) {
        String response = openAiModelFactory.create().generate(prompt).content();
        repository.save(new EquityAi(prompt, response));
        return response;
    }

    public EquityAiResponse<Integer, String> analyzeFile(MultipartFile file) throws IOException, CsvValidationException {
        var inputStream = file.getInputStream();
        List<JobDataSet> jobDataList = readCSV(inputStream);

        var jobTitles = findUniqueJobs(jobDataList);
        var uniqueJobTitles = new HashSet<>(jobTitles);

        String mostCommonJob = mostCommonJob(jobTitles);

        List<SalaryDatapoint<Integer>> experienceDataPoints = averageSalaryByDatapoint(jobDataList, mostCommonJob, JobDataSet::getExperience);
        List<SalaryDatapoint<String>> locationDataPoints = averageSalaryByDatapoint(jobDataList, mostCommonJob, JobDataSet::getLocality);

        var response = openAiModelFactory.createDefaultChatModel()
                .generate(SALARY_ANALYSIS_PROMPT + createPrompt(jobDataList));
        var sysarbRecommendation = openAiModelFactory.createDefaultChatModel()
                .generate(response + PRODUCT_RECOMMENDATION_PROMPT + SYSARB_PRODUCTS);

        return new EquityAiResponse<>(response, sysarbRecommendation,
                uniqueJobTitles, mostCommonJob, experienceDataPoints, locationDataPoints);
    }

    private static String createPrompt(List<JobDataSet> jobDataList) {
        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append(DATA_HEADER);

        for (JobDataSet jobData : jobDataList) {
            stringBuilder.append(jobData.toString()).append("\n");
        }
        return stringBuilder.toString();
    }
}