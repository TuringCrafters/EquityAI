package ai.equity.salt;

import ai.equity.salt.openai.file.reader.implementation.CsvFileReader;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileInputStream;

import static ai.equity.salt.openai.utils.DataAnalysis.calculateGenderRatio;


class DataAnalysisUnitTest  {

    private final CsvFileReader csvFileReader = new CsvFileReader();

    @Test
    @SneakyThrows
    void test(){

        var dataSetFile = new File("src/test/java/ai/equity/salt/data/Dataset.csv");
        Assertions.assertEquals("Dataset.csv", dataSetFile.toPath().getFileName().toString());
        Assertions.assertTrue(dataSetFile.exists());

        var jobDataList = csvFileReader.readFile(new FileInputStream(dataSetFile));

        System.out.println(jobDataList);
    }

    @Test
    @SneakyThrows
    void calculateGenderRatioTest(){

        var dataSetFile = new File("src/test/java/ai/equity/salt/data/DataSet.csv");
        var jobDataList = csvFileReader.readFile(new FileInputStream(dataSetFile));
        var result = calculateGenderRatio(jobDataList);
        Assertions.assertEquals(37, result.get("Male"));
        Assertions.assertEquals(28, result.get("Female"));
    }


}
