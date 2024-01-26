package ai.equity.salt.openai.file.reader.implementation;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.file.reader.FileReader;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class CsvFileReader implements FileReader {

    @Override
    public List<JobDataSet> readFile(MultipartFile file) {

        List<JobDataSet> jobDataList = new ArrayList<>();

        try (CSVReader csvReader = new CSVReader((new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8)))) {
            csvReader.readNext();

            String[] nextRecord;
            while ((nextRecord = csvReader.readNext()) != null) {
                if (nextRecord.length < 6) {
                    continue;
                }
                JobDataSet jobData = new JobDataSet();
                jobData.setPosition(nextRecord[0]);
                jobData.setSalary(Double.parseDouble(nextRecord[1]));
                jobData.setExperience(Integer.parseInt(nextRecord[2]));
                jobData.setAge(Integer.parseInt(nextRecord[3]));
                jobData.setGeographicLocation(nextRecord[4]);
                jobData.setGender(nextRecord[5]);

                jobDataList.add(jobData);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }
        return jobDataList;
    }
}
