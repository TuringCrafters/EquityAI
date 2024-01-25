package ai.equity.salt.openai.file.datapoint;

import java.util.List;

@FunctionalInterface
public interface FileDataPointStandardize {

    List<String> getFileStandardizedDataPoints(List<String> fileDataPoints);

}
