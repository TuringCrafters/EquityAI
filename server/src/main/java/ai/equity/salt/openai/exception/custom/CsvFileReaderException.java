package ai.equity.salt.openai.exception.custom;

import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

public class CsvFileReaderException extends ResponseStatusException {
    public CsvFileReaderException() {
        super(BAD_REQUEST, "File formatting issue. Please upload a file with the correct format.");
    }
}
