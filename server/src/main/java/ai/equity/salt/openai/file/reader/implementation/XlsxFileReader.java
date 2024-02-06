package ai.equity.salt.openai.file.reader.implementation;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.exception.custom.FileReaderException;
import ai.equity.salt.openai.file.datapoint.DateConverter;
import ai.equity.salt.openai.file.reader.FileReader;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
public class XlsxFileReader implements FileReader {

    @Override
    public List<JobDataSet> readFile(InputStream fileInputStream) {
        Workbook dataSet;
        try {
            dataSet = new XSSFWorkbook(fileInputStream);
        } catch (IOException e) {
            log.error(e.getLocalizedMessage());
            throw new FileReaderException();
        }
        Sheet sheet = dataSet.getSheetAt(0);
        sheet.removeRow(sheet.getRow(0));

        List<JobDataSet> data = new ArrayList<>();
        for (Row row : sheet) {
            List<String> rowData = new ArrayList<>();
            JobDataSet jobData;

            for (Cell cell : row) {
                String cellValue;
                switch (cell.getCellType()) {
                    case STRING:
                        cellValue = cell.getStringCellValue();
                        break;
                    case NUMERIC:
                        if (DateUtil.isCellDateFormatted(cell)) {
                            cellValue = cell.getDateCellValue().toString();
                        } else {
                            cellValue = String.valueOf(cell.getNumericCellValue());
                        }
                        break;
                    default:
                        cellValue = "N/A";
                }
                rowData.add(cellValue);
            }
            try {
                jobData = getJobDataSet(rowData);
            } catch (NoSuchElementException e) {
                log.error(String.valueOf(e));
                return data;
            }
            data.add(jobData);


        }
        return data;
    }

    @NotNull
    private JobDataSet getJobDataSet(List<String> rowData) {
        JobDataSet jobData = new JobDataSet();
        jobData.setId(rowData.getFirst());
        jobData.setGender(rowData.get(1));
        jobData.setAge(DateConverter.calculateYears(rowData.get(2)));
        jobData.setExperience(DateConverter.calculateYears(rowData.get(3)));
        jobData.setPosition(rowData.get(4));
        jobData.setSalary(Double.parseDouble(rowData.get(5)));
        jobData.setGeographicLocation(rowData.get(9));
        jobData.setCurrency(rowData.get(10));
        return jobData;
    }
}
