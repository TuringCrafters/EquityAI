package ai.equity.salt;

import ai.equity.salt.config.LocalDevTestcontainersConfig;
import org.springframework.boot.SpringApplication;

public class TestApplication {

	public static void main(String[] args) {
		SpringApplication.from(Application::main)
				.with(LocalDevTestcontainersConfig.class)
				.run(args);
	}

}
