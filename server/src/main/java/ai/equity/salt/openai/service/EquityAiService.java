package ai.equity.salt.openai.service;

import ai.equity.salt.openai.controller.dto.CompanyOverview;
import ai.equity.salt.openai.controller.dto.EquityAiResponse;
import ai.equity.salt.openai.controller.dto.JobDataSet;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.text.DecimalFormat;

@Service
@RequiredArgsConstructor
@Slf4j
public class EquityAiService {
    private final DecimalFormat decimalFormat = new DecimalFormat("0.00");
    private final FileReaderService fileReader;
    private final AiResponse aiResponse;

    public EquityAiResponse analyzeFile(MultipartFile file) {
        var jobs = Jobs.from(fileReader.readFile(file));
        var mostCommonJob = jobs.mostCommonJob();

        var experienceDataPoints = jobs.averageSalaryByDatapoint(mostCommonJob, JobDataSet::getExperience);
        var locationDataPoints = jobs.averageSalaryByDatapoint(mostCommonJob, JobDataSet::getGeographicLocation);

        var response = aiResponse.generateResponse(jobs.getData());
        var sysarbRecommendation = aiResponse.generateRecommendation(response);

        var companyOverview = new CompanyOverview(jobs.getTopFiveHighestPayingPositions(), jobs.toListString().size(),
                jobs.calculateGenderRatio(),
                (int) jobs.getStatistics().age().getAverage(),
                (int) jobs.getStatistics().salary().getAverage(),
                (int) jobs.getStatistics().tenure().getAverage());

        return new EquityAiResponse(
                response,
                sysarbRecommendation,
                jobs.uniqueTitles(),
                mostCommonJob, experienceDataPoints, locationDataPoints,
                decimalFormat.format(jobs.calculateGenderPayGap()),
                companyOverview);
    }
}
