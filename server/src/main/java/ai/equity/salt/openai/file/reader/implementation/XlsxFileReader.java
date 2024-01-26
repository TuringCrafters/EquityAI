package ai.equity.salt.openai.file.reader.implementation;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.file.reader.FileReader;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class XlsxFileReader implements FileReader {

    @Override
    public List<JobDataSet> readFile(MultipartFile file) {
        Workbook dataSet = null;
        try {
            dataSet = new XSSFWorkbook(file.getInputStream());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        Sheet sheet = dataSet.getSheetAt(0);
        sheet.removeRow(sheet.getRow(0));

        List<JobDataSet> data = new ArrayList<>();
        int i = 0;
        for (Row row : sheet) {
            List<String> rowData = new ArrayList<>();
            for (Cell cell : row) {
                String cellValue = "";
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
                        cellValue = " ";
                }
                rowData.add(cellValue);
            }
            var jobData = new JobDataSet(rowData);
            System.out.println("jobData = " + jobData);
            data.add(jobData);
            i++;
        }
        return data;
    }
}
