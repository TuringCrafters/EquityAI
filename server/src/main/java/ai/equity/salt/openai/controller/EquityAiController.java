package ai.equity.salt.openai.controller;

import ai.equity.salt.openai.controller.dto.EquityAiResponse;
import ai.equity.salt.openai.file.datapoint.DatapointStandardizer;
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
    private final DatapointStandardizer datapointStandardizer;


    @PostMapping("file/analyze")
    @ResponseStatus(CREATED)
    public EquityAiResponse sendFile(@RequestParam MultipartFile file) throws IOException, CsvValidationException {
        return service.analyzeFile(file);
    }


    @PostMapping("file/any")
    @ResponseStatus(CREATED)
    public List<List<String>> sendAnyFile(@RequestParam MultipartFile file) {
        var fileDetails = service.readAnyFile(file);
        var standardizedDataPoints = datapointStandardizer.getFileStandardizedDataPoints(fileDetails.getFirst());
        System.out.println("standardizedDataPoints = " + standardizedDataPoints);
        return fileDetails;
    }
}