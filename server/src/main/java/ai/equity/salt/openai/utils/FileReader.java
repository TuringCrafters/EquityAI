package ai.equity.salt.openai.utils;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class FileReader {
    public static List<JobDataSet> readCSV(InputStream inputStream) throws IOException, CsvValidationException {
        List<JobDataSet> jobDataList = new ArrayList<>();

        try (CSVReader csvReader = new CSVReader((new InputStreamReader(inputStream, StandardCharsets.UTF_8)))) {
            csvReader.readNext();

            String[] nextRecord;
            while ((nextRecord = csvReader.readNext()) != null) {
                if (nextRecord.length < 5) {
                    continue;
                }
                JobDataSet jobData = new JobDataSet();
                jobData.setPosition(nextRecord[0]);
                jobData.setSalary(Double.parseDouble(nextRecord[1]));
                jobData.setExperience(Integer.parseInt(nextRecord[2]));
                jobData.setAge(Integer.parseInt(nextRecord[3]));
                jobData.setLocality(nextRecord[4]);

                jobDataList.add(jobData);
            }
        }
        return jobDataList;
    }
}