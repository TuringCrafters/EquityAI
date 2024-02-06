package ai.equity.salt.openai.controller;

import ai.equity.salt.openai.controller.dto.EquityAiResponse;
import ai.equity.salt.openai.service.EquityAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class EquityAiController {

    private final EquityAiService service;

    @PostMapping("file/analyze")
    @ResponseStatus(CREATED)
    public EquityAiResponse sendFile(@RequestParam MultipartFile file) {
        return service.analyzeFile(file);
    }

}