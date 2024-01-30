package ai.equity.salt.openai.utils;

import ai.equity.salt.openai.file.reader.implementation.CsvFileReader;
import ai.equity.salt.openai.file.reader.implementation.XlsxFileReader;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;

import static ai.equity.salt.openai.utils.DataAnalysis.mostCommonJob;

class DataAnalysisTest {

    private final CsvFileReader csvFileReader = new CsvFileReader();
    private final XlsxFileReader xlsxFileReader = new XlsxFileReader();

    /**
     * Method under test: {@link DataAnalysis#mostCommonJob(List)}
     */
    @Test
    @SneakyThrows
    void testMostCommonJobCsv() {

        var dataSetFile = new File("src/test/java/ai/equity/salt/data/Dataset.csv");

        var jobDataList = csvFileReader.readFile(new FileInputStream(dataSetFile));
        var mostCommonJOb = mostCommonJob(jobDataList);
        Assertions.assertEquals("Software Engineer", mostCommonJOb);
    }

    @Test
    @SneakyThrows
    void testMostCommonJobXlsx() {

        var dataSetFile = new File("src/test/java/ai/equity/salt/data/Dataset_3.xlsx");

        var jobDataList = xlsxFileReader.readFile(new FileInputStream(dataSetFile));
        var mostCommonJOb = mostCommonJob(jobDataList);
        Assertions.assertEquals("Software Engineer", mostCommonJOb);
    }

}
