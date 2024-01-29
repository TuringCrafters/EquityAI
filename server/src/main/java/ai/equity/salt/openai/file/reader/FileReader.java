package ai.equity.salt.openai.file.reader;

import ai.equity.salt.openai.controller.dto.JobDataSet;

import java.io.InputStream;
import java.util.List;

@FunctionalInterface
public interface FileReader {
    List<JobDataSet> readFile(InputStream fileInputStream);
}
