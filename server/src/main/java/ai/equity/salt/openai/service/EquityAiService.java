package ai.equity.salt.openai.service;

import ai.equity.salt.openai.controller.dto.CompanyOverview;
import ai.equity.salt.openai.controller.dto.EquityAiResponse;
import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.controller.dto.SalaryDatapoint;
import ai.equity.salt.openai.file.reader.implementation.CsvFileReader;
import ai.equity.salt.openai.file.reader.implementation.XlsxFileReader;
import ai.equity.salt.openai.model.OpenAiModelFactory;
import ai.equity.salt.openai.repository.JpaEquityAiRepo;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.*;
import java.util.stream.Collectors;

import static ai.equity.salt.openai.utils.AiPromptData.*;
import static ai.equity.salt.openai.utils.DataAnalysis.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class EquityAiService {

    private final OpenAiModelFactory openAiModelFactory;
    private final JpaEquityAiRepo repository;
    private final CsvFileReader csvFileReader = new CsvFileReader();
    private final XlsxFileReader xlsxFileReader = new XlsxFileReader();
    private final DecimalFormat decimalFormat = new DecimalFormat("0.00");

    private static String createPrompt(List<JobDataSet> jobDataList) {
        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append(DATA_HEADER);

        for (JobDataSet jobData : jobDataList) {
            stringBuilder.append(jobData.toString()).append("\n");
        }
        return stringBuilder.toString();
    }

    public EquityAiResponse analyzeFile(MultipartFile file) throws IOException, CsvValidationException {
        var inputStream = file.getInputStream();
        List<JobDataSet> jobDataList = csvFileReader.readFile(file);
        var ageStats = jobDataList.stream().collect(Collectors.summarizingDouble(JobDataSet::getAge));
        ageStats.getAverage();
        var salaryStats = jobDataList.stream().collect(Collectors.summarizingDouble(JobDataSet::getSalary));
        salaryStats.getAverage();
        var tenureStats = jobDataList.stream().collect(Collectors.summarizingDouble(JobDataSet::getExperience));
        tenureStats.getAverage();

        var topFiveHighestPayingPositions = jobDataList.stream()
                .sorted(Comparator.comparing(JobDataSet::getSalary).reversed())
                .limit(5)
                .toList();

        var jobDataStringList = jobDataList.stream().map(JobDataSet::toString).toList();

        var jobTitles = findUniqueJobs(jobDataList);
        var uniqueJobTitles = new HashSet<>(jobTitles);

        String mostCommonJob = mostCommonJob(jobTitles);

        List<SalaryDatapoint<Integer>> experienceDataPoints = averageSalaryByDatapoint(jobDataList, mostCommonJob, JobDataSet::getExperience);
        List<SalaryDatapoint<String>> locationDataPoints = averageSalaryByDatapoint(jobDataList, mostCommonJob, JobDataSet::getGeographicLocation);

//        var response = openAiModelFactory.createDefaultChatModel()
//                .generate(SALARY_ANALYSIS_PROMPT + createPrompt(jobDataList));
//
//        log.trace("Response : " + response);
//        var sysarbRecommendation = openAiModelFactory.createDefaultChatModel()
//                .generate(response + PRODUCT_RECOMMENDATION_PROMPT + SYSARB_PRODUCTS);
//        log.trace("Sysarb Recommendation : " + sysarbRecommendation);
//
//
//        //TODO: use specific SQL exception to catch the error
//        try {
//            repository.save(new EquityAi(jobDataStringList, response, sysarbRecommendation));
//        } catch (Exception e) {
//            log.error(e.getMessage());
//        }
        return new EquityAiResponse("response", "sysarbRecommendation",
                uniqueJobTitles, mostCommonJob, experienceDataPoints, locationDataPoints, calculateGenderPayGap(jobDataList),
                new CompanyOverview(topFiveHighestPayingPositions, salaryStats.getCount()));
    }

    public List<JobDataSet> readAnyFile(MultipartFile file) {
        String fileExtension = Objects.requireNonNull(file.getOriginalFilename())
                .split("\\.")[1];

        return switch (fileExtension) {
            case "csv" -> csvFileReader.readFile(file);
            case "xlsx" -> xlsxFileReader.readFile(file);
            default -> throw new IllegalArgumentException("Unsupported file. Please use .csv or .xlsx");
        };
    }
}