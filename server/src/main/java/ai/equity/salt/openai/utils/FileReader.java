package ai.equity.salt.openai.utils;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;


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
                jobData.setGeographicLocation(nextRecord[4]);

                jobDataList.add(jobData);
            }
        }
        return jobDataList;
    }

    public static List<JobDataSet> readCSVFromExcel(InputStream inputStream) throws IOException, CsvValidationException {
        List<JobDataSet> jobDataList = new ArrayList<>();

        try (CSVReader csvReader = new CSVReader((new InputStreamReader(inputStream, StandardCharsets.UTF_8)))) {
            csvReader.readNext();

            String[] nextRecord;
            while ((nextRecord = csvReader.readNext()) != null) {
                if (nextRecord.length < 13) {
                    continue;
                }
                JobDataSet jobData = new JobDataSet();
                jobData.setId(nextRecord[0]);
                jobData.setPosition(nextRecord[4]);
                jobData.setSalary(Double.parseDouble(nextRecord[5]));
                jobData.setExperience((int)Double.parseDouble(nextRecord[6]));
                jobData.setAge((int)Double.parseDouble(nextRecord[6] + 10));
                jobData.setGeographicLocation(nextRecord[9]);

                jobDataList.add(jobData);
            }
        }
        return jobDataList;
    }

    public static InputStream convertXlsxToCsv(InputStream inputStream) throws IOException {
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0);

        ByteArrayOutputStream csvOutputStream = new ByteArrayOutputStream();
        PrintStream csvPrintStream = new PrintStream(csvOutputStream);

        for (Row row : sheet) {
            for (Cell cell : row) {
                String cellValue = "";
                if (cell.getCellType() == CellType.STRING) {
                    cellValue = cell.getStringCellValue();
                } else if (cell.getCellType() == CellType.NUMERIC) {
                    cellValue = String.valueOf(cell.getNumericCellValue());
                } else if (cell.getCellType() == CellType.BOOLEAN) {
                    cellValue = String.valueOf(cell.getBooleanCellValue());
                }
                csvPrintStream.print(cellValue);
                csvPrintStream.print(",");
            }
            csvPrintStream.println();
        }
        csvPrintStream.flush();
        return new ByteArrayInputStream(csvOutputStream.toByteArray());
    }
}