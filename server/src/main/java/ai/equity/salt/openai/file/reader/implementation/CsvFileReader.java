package ai.equity.salt.openai.file.reader.implementation;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.exception.custom.CsvFileReaderException;
import ai.equity.salt.openai.exception.custom.FileReaderException;
import ai.equity.salt.openai.file.datapoint.DateConverter;
import ai.equity.salt.openai.file.reader.FileReader;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import static java.nio.charset.StandardCharsets.UTF_8;

@Slf4j
public class CsvFileReader implements FileReader {

    @Override
    public List<JobDataSet> readFile(InputStream fileInputStream) {

        List<JobDataSet> jobDataList = new ArrayList<>();

        try (CSVReader csvReader = new CSVReader((new InputStreamReader(fileInputStream, UTF_8)))) {
            csvReader.readNext();

            String[] nextRecord;
            while ((nextRecord = csvReader.readNext()) != null) {
                if (nextRecord.length < 6) {
                    continue;
                }
                JobDataSet jobData = getJobDataSet(nextRecord);

                jobDataList.add(jobData);
            }
        } catch (IOException e) {
            log.error(e.getLocalizedMessage());
            throw new FileReaderException();
        } catch (CsvValidationException e) {
            log.error(e.getLocalizedMessage());
            throw new CsvFileReaderException();
        }
        return jobDataList;
    }

    @NotNull
    private static JobDataSet getJobDataSet(String[] nextRecord) {
        JobDataSet jobData = new JobDataSet();
        jobData.setId(nextRecord[0]);
        jobData.setGender(nextRecord[1]);
        jobData.setAge(DateConverter.calculateYears(nextRecord[2]));
        jobData.setExperience(DateConverter.calculateYears(nextRecord[3]));
        jobData.setPosition(nextRecord[4]);
        jobData.setSalary(Double.parseDouble(nextRecord[5]));
        jobData.setGeographicLocation(nextRecord[9]);
        jobData.setCurrency(nextRecord[10]);
        return jobData;
    }
}
