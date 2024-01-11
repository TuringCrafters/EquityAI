package ai.equity.salt.openai.config;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig{

    @Value("${website.base-url.frontend}")
    private String allowedApi;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings (@NotNull CorsRegistry registry){
                System.out.println(allowedApi);
                registry.addMapping("/api/**")
                        .allowedOrigins(allowedApi)
                        .allowedMethods("GET", "POST", "DELETE", "PUT");
            }
        };
    }

}