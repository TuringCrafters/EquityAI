package ai.equity.salt.openai.controller;

import ai.equity.salt.openai.controller.dto.EquityAiResponse;
import ai.equity.salt.openai.service.EquityAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class EquityAiController {

    private final EquityAiService service;

    @PostMapping("ai")
    @ResponseStatus(CREATED)
    public String sendAiResponse(@RequestBody String prompt){
        return service.getAiResponse(prompt);
    }

    @PostMapping("file/analyze")
    @ResponseStatus(CREATED)
    public EquityAiResponse sendFile(@RequestParam MultipartFile file) throws IOException {
        return service.analyzeFile(file);
    }

    @GetMapping("file/data")
    @ResponseStatus(OK)
    public String mockData() {
        return """
                {
                  "location_details": [
                    {
                      "location": "CityA",
                      "salary": {
                        "average": 110000,
                        "above_average": 115000,
                        "below_average": 105000
                      }
                    },
                    {
                      "location": "CityB",
                      "salary": {
                        "average": 135000,
                        "above_average": 140000,
                        "below_average": 130000
                      }
                    },
                    {
                      "location": "CityC",
                      "salary": {
                        "average": 95000,
                        "above_average": 100000,
                        "below_average": 90000
                      }
                    }
                  ],
                  "experience_details": [
                    {
                      "years_of_experience": 3,
                      "salary": {
                        "average": 105000,
                        "above_average": 110000,
                        "below_average": 100000
                      }
                    },
                    {
                      "years_of_experience": 7,
                      "salary": {
                        "average": 145000,
                        "above_average": 150000,
                        "below_average": 135000
                      }
                    },
                    {
                      "years_of_experience": 2,
                      "salary": {
                        "average": 95000,
                        "above_average": 100000,
                        "below_average": 90000
                      }
                    }
                  ]
                }
                """;
    }
}