package ai.equity.salt;

import ai.equity.salt.config.LocalDevTestcontainersConfig;
import ai.equity.salt.openai.controller.EquityAiController;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@SpringBootTest
@Import(LocalDevTestcontainersConfig.class)
class ApplicationTests {

	@Autowired
	private EquityAiController controller;

	/* Smoke Test */
	@Test
	void contextLoads() {
		assertThat(controller).isNotNull();
	}

}