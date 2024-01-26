package ai.equity.salt.openai.file.reader.implementation;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.file.reader.FileReader;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

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
            throw new RuntimeException(e);
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
                jobData = new JobDataSet(rowData);
            } catch (NoSuchElementException e) {
                log.error(String.valueOf(e));
                return data;
            }
            data.add(jobData);


        }
        return data;
    }
}
