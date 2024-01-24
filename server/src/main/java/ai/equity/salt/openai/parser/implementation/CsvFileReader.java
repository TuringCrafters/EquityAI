package ai.equity.salt.openai.parser.implementation;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.parser.FileReader;
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
    public List<List<String>> readFile(MultipartFile file) {

        List<List<String>> jobDataList = new ArrayList<>();

        try (CSVReader csvReader = new CSVReader((new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8)))) {
            csvReader.readNext();

            String[] nextRecord;
            while ((nextRecord = csvReader.readNext()) != null) {
                if (nextRecord.length < 5) {
                    continue;
                }
                jobDataList.add(List.of(nextRecord));
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }
        return jobDataList;
    }
}
