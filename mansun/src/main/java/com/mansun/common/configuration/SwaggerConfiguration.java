package com.mansun.common.configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info().title("SSAFY 특화 프로젝트 API 명세서").description("").version("V3").contact(new io.swagger
                .v3.oas.models.info.Contact().name("Jinny"));
        return new OpenAPI().components(new Components()).info(info);
    }

    @Bean
    public GroupedOpenApi publicApi(){
        return GroupedOpenApi.builder().group("ssafy").packagesToScan("com.mansun").build();

    }
}
