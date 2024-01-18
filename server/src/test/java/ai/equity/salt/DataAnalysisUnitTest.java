package ai.equity.salt;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;

import static ai.equity.salt.openai.utils.FileReader.readCSV;

public class DataAnalysisUnitTest  {

    @Test
    @SneakyThrows
    void test(){

        var dataSetFile = new File("src/test/java/ai/equity/salt/data/DataSet.csv");
        Assertions.assertEquals(dataSetFile.toPath().getFileName().toString(), "DataSet.csv");
        Assertions.assertTrue(dataSetFile.exists());

        List<JobDataSet> jobDataList = readCSV(new FileInputStream(dataSetFile));

        System.out.println(jobDataList);
    }
}
