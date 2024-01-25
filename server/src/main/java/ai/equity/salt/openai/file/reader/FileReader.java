package ai.equity.salt.openai.file.reader;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@FunctionalInterface
public interface FileReader {
    List<List<String>> readFile(MultipartFile file);
}
