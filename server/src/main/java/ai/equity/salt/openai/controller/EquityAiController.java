package ai.equity.salt.openai.controller;

import ai.equity.salt.openai.service.EquityAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
@CrossOrigin("equity-ai.vercel.app")
public class EquityAiController {

    private final EquityAiService service;

    @PostMapping("ai")
    @ResponseStatus(CREATED)
    public String sendAiResponse(@RequestBody String prompt){
        return service.getAiResponse(prompt);
    }


}
