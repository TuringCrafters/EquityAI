package ai.equity.salt.openai.utils;

import ai.equity.salt.openai.file.reader.implementation.CsvFileReader;
import ai.equity.salt.openai.file.reader.implementation.XlsxFileReader;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;

import static ai.equity.salt.openai.utils.DataAnalysis.calculateGenderRatio;
import static ai.equity.salt.openai.utils.DataAnalysis.mostCommonJob;

class DataAnalysisTest {

    private final CsvFileReader csvFileReader = new CsvFileReader();
    private final XlsxFileReader xlsxFileReader = new XlsxFileReader();


    @Test
    @SneakyThrows
    void testFileExists(){

        var dataSetFile = new File("src/test/java/ai/equity/salt/data/DataSet.csv");
        Assertions.assertEquals("DataSet.csv", dataSetFile.toPath().getFileName().toString());
        Assertions.assertEquals("DataSet_3.xlsx", dataSetFile.toPath().getFileName().toString());
        Assertions.assertTrue(dataSetFile.exists());

        var jobDataList = csvFileReader.readFile(new FileInputStream(dataSetFile));
    }

    /**
     * Method under test: {@link DataAnalysis#mostCommonJob(List)}
     */
    @Test
    @SneakyThrows
    void testMostCommonJobCsv() {

        var dataSetFile = new File("src/test/java/ai/equity/salt/data/DataSet.csv");

        var jobDataList = csvFileReader.readFile(new FileInputStream(dataSetFile));
        var mostCommonJOb = mostCommonJob(jobDataList);
        Assertions.assertEquals("Financial Analyst", mostCommonJOb);
    }

    @Test
    @SneakyThrows
    void testMostCommonJobXlsx() {

        var dataSetFile = new File("src/test/java/ai/equity/salt/data/Dataset_3.xlsx");

        var jobDataList = xlsxFileReader.readFile(new FileInputStream(dataSetFile));
        var mostCommonJOb = mostCommonJob(jobDataList);
        Assertions.assertEquals("Software Engineer", mostCommonJOb);
    }

    @Test
    @SneakyThrows
    void calculateGenderRatioTest(){

        var dataSetFile = new File("src/test/java/ai/equity/salt/data/DataSet.csv");
        var jobDataList = csvFileReader.readFile(new FileInputStream(dataSetFile));
        var result = calculateGenderRatio(jobDataList);
        Assertions.assertEquals(14, result.get("Male"));
        Assertions.assertEquals(36, result.get("Female"));
    }

}
