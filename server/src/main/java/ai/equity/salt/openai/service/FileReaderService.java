package ai.equity.salt.openai.service;

import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.exception.custom.FileReaderException;
import ai.equity.salt.openai.file.reader.implementation.CsvFileReader;
import ai.equity.salt.openai.file.reader.implementation.XlsxFileReader;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.UnsupportedMediaTypeStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class FileReaderService {

    private static final String EXCEL_2007_FILE = "xlsx";
    private static final String CSV_FILE = "csv";

    public List<JobDataSet> readFile(MultipartFile file) {
        String fileExtension = Objects.requireNonNull(file.getOriginalFilename()).split("\\.")[1];

        try {
            return switch (fileExtension) {
                case CSV_FILE -> new CsvFileReader().readFile(file.getInputStream());
                case EXCEL_2007_FILE -> new XlsxFileReader().readFile(file.getInputStream());
                default -> throw new UnsupportedMediaTypeStatusException("Unsupported file. Please use .csv or .xlsx");
            };
        } catch (IOException e) {
            log.error(e.getLocalizedMessage());
            throw new FileReaderException();
        }
    }
}
