package ai.equity.salt.openai.exception.custom;

import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY;

public class FileReaderException extends ResponseStatusException {
    public FileReaderException() {
        super(UNPROCESSABLE_ENTITY, "Unable to read file. Please upload a file with the correct format.");
    }
}
