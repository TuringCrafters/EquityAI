package ai.equity.salt.openai.controller;

import ai.equity.salt.openai.service.EquityAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EquityAiController {

    private final EquityAiService service;

    @PostMapping("ai")
    @ResponseStatus(CREATED)
    public String sendAiResponse(@RequestBody String prompt){
        return service.getAiResponse(prompt);
    }

    @PostMapping("upload-file")
    @ResponseStatus(CREATED)
    public String sendFile(@RequestParam MultipartFile file){
        return file.getName();
    }
}