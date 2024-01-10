package ai.equity.salt;

import ai.equity.salt.config.LocalDevTestcontainersConfig;
import ai.equity.salt.openai.controller.EquityAiController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Import(LocalDevTestcontainersConfig.class)
class ApplicationTests {

	@Autowired
	EquityAiController controller;

	/*Smoke test*/
	@Test
	void contextLoads() {
		assertThat(controller).isNotNull();

	}

}
