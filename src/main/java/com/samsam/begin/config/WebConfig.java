package com.samsam.begin.config;

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
            registry.addMapping("/**")
                    .allowedOriginPatterns("http://localhost:3000") // 허용할 출처 패턴 명시
                    .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드 설정
                    .allowedHeaders("*") // 허용할 HTTP 헤더 설정
                    .allowCredentials(true) // CORS 요청에 인증 정보 포함 여부 설정
                    .maxAge(3600); // CORS 요청 캐시 유효 시간 설정
         }
      };
   }
}

