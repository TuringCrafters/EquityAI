package ai.equity.salt.openai.controller;

import ai.equity.salt.openai.controller.dto.EquityAiResponse;
import ai.equity.salt.openai.controller.dto.JobDataSet;
import ai.equity.salt.openai.service.EquityAiService;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class EquityAiController {

    private final EquityAiService service;

    @PostMapping("file/analyze")
    @ResponseStatus(CREATED)
    public EquityAiResponse sendFile(@RequestParam MultipartFile file) throws IOException, CsvValidationException {
        return service.analyzeFile(file);
    }


    @PostMapping("file/any")
    @ResponseStatus(CREATED)
    public List<JobDataSet> sendAnyFile(@RequestParam MultipartFile file) {
        return service.readAnyFile(file);
    }
}