package com.simple_city.app.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Update this path according to your API endpoints
                .allowedOrigins("http://localhost:4200") // Allowed front-end domain
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed methods
                .allowCredentials(true) // Include cookies in the requests if applicable
                .allowedHeaders("*"); // Allowed headers
    }
}
