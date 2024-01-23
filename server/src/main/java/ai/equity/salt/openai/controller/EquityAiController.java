package ai.equity.salt.openai.controller;

import ai.equity.salt.openai.controller.dto.EquityAiResponse;
import ai.equity.salt.openai.service.EquityAiService;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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

    @PostMapping("file/excel")
    @ResponseStatus(CREATED)
    public Map<Integer, List<String>> sendExcelFile(@RequestParam MultipartFile file) throws IOException {
        return service.readExcelFile(file);
    }

}