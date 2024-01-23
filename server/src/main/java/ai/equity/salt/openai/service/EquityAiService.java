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
import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static ai.equity.salt.openai.utils.AiPromptData.*;
import static ai.equity.salt.openai.utils.DataAnalysis.*;
import static ai.equity.salt.openai.utils.FileReader.readCSV;
import static ai.equity.salt.openai.utils.FileReader.readExcel;

@Service
@RequiredArgsConstructor
@Slf4j
public class EquityAiService {

    private final OpenAiModelFactory openAiModelFactory;

    private final JpaEquityAiRepo repository;

    public EquityAiResponse analyzeFile(MultipartFile file) throws IOException, CsvValidationException {
        var inputStream = file.getInputStream();
        List<JobDataSet> jobDataList = readCSV(inputStream);

        var jobDataStringList = jobDataList.stream().map(JobDataSet::toString).toList();

        var jobTitles = findUniqueJobs(jobDataList);
        var uniqueJobTitles = new HashSet<>(jobTitles);

        String mostCommonJob = mostCommonJob(jobTitles);

        List<SalaryDatapoint<Integer>> experienceDataPoints = averageSalaryByDatapoint(jobDataList, mostCommonJob, JobDataSet::getExperience);
        List<SalaryDatapoint<String>> locationDataPoints = averageSalaryByDatapoint(jobDataList, mostCommonJob, JobDataSet::getLocality);

        var response = openAiModelFactory.createDefaultChatModel()
                .generate(SALARY_ANALYSIS_PROMPT + createPrompt(jobDataList));

        log.trace("Response : " + response);
        var sysarbRecommendation = openAiModelFactory.createDefaultChatModel()
                .generate(response + PRODUCT_RECOMMENDATION_PROMPT + SYSARB_PRODUCTS);
        log.trace("Sysarb Recommendation : " + sysarbRecommendation);


        //Try catch is here incase the data is too big for the database to save
        // Then it will atleast respond with the data but not save it
        //
        try {
            repository.save(new EquityAi(jobDataStringList, response, sysarbRecommendation));
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return new EquityAiResponse(response, sysarbRecommendation, uniqueJobTitles, mostCommonJob, experienceDataPoints, locationDataPoints);
    }

    public Map<Integer, List<String>> readExcelFile(MultipartFile file) throws IOException {
        var inputStream = file.getInputStream();
        return readExcel(inputStream);
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