package ai.equity.salt.openai.file.reader;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@FunctionalInterface
public interface FileReader {
    List<JobDataSet> readFile(MultipartFile file);
}
