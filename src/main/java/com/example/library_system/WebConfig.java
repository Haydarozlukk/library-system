import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // Tüm endpoint'ler için geçerli
                        .allowedOrigins("http://localhost:5174")  // Frontend'in portu
                        .allowedMethods("GET", "POST", "PUT", "DELETE")  // İzin verilen HTTP metotları
                        .allowedHeaders("*")  // Tüm header'lar kabul edilir
                        .allowCredentials(true);  // İsteğe bağlı olarak credentials izni
            }
        };
    }
}
