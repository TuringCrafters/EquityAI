package ai.equity.salt;

import ai.equity.salt.config.LocalDevTestcontainersConfig;
import ai.equity.salt.openai.model.EquityAiRequest;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Import(LocalDevTestcontainersConfig.class)
class IntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @Disabled("Disabled due to using tokens")
    @SneakyThrows
    void shouldReturnCorrectResponseFromAi() {

        String response = this.mockMvc.perform(post("/api/v1/ai")
                .contentType(APPLICATION_JSON)
                .content(new EquityAiRequest("What is the capital of Germany?")
                        .toString()))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse().getContentAsString();
        Assertions.assertTrue(response.contains("Berlin"));
    }
}
