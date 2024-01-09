package ai.equity.salt;

import ai.equity.salt.config.LocalDevTestcontainersConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.TestConfiguration;


@TestConfiguration(proxyBeanMethods = false)
public class TestApplication {

	public static void main(String[] args) {
		SpringApplication.from(Application::main)
				.with(LocalDevTestcontainersConfig.class)
				.run(args);
	}

}
