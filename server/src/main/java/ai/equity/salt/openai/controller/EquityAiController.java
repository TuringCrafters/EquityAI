package ai.equity.salt.openai.controller;

import ai.equity.salt.openai.service.EquityAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class EquityAiController {

    private final EquityAiService service;

    @PostMapping("ai")
    public String sendAiResponse(@RequestBody String prompt){
        return service.getAiResponse(prompt);
    }


}
