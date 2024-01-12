package ai.equity.salt.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "website.base-url")
public record WebsiteProperties(
        String frontend
) {
}
