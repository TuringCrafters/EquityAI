package ai.equity.salt.openai.file.reader;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class XlsxFileReader implements FileReader {
    @Override
    public List<List<String>> readFile(MultipartFile file) {
        Workbook dataSet = null;
        try {
            dataSet = new XSSFWorkbook(file.getInputStream());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        Sheet sheet = dataSet.getSheetAt(0);

        List<List<String>> data = new ArrayList<>();
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
            data.add(i, rowData);
            i++;
        }
        return data;
    }
}
