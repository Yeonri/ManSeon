package com.mansun.common.configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {
	@Bean
	public OpenAPI openAPI() {
		SecurityScheme securityScheme = new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer")
				.bearerFormat("JWT").in(SecurityScheme.In.HEADER).name("Authorization");

		// Security Requirement 정의
		SecurityRequirement securityRequirement = new SecurityRequirement().addList("BearerAuth");

		Info info = new Info().title("SSAFY 특화 프로젝트 API 명세서").description("").version("V3")
				.contact(new io.swagger.v3.oas.models.info.Contact().name("Jinny"));

		return new OpenAPI().components(new Components()).info(info).addSecurityItem(securityRequirement)
				.schemaRequirement("BearerAuth", securityScheme);
	}

    @Bean
    public GroupedOpenApi RecommentApi(){
        return GroupedOpenApi.builder().group("Recomment API")
                .packagesToScan(
                        "com.mansun.features.recomment",
                        "com.mansun.requestDto.recomment",
                        "com.mansun.responseDto.comment")
                .build();
    }
    @Bean
    public GroupedOpenApi CommentApi(){
        return GroupedOpenApi.builder().group("Comment API")
                .packagesToScan(
                        "com.mansun.features.comment",
                        "com.mansun.requestDto.comment",
                        "com.mansun.responseDto.comment")
                .build();
    }

    @Bean
    public GroupedOpenApi UsersApi(){
        return GroupedOpenApi.builder().group("User API")
                .packagesToScan(
                        "com.mansun.features.user",
                        "com.mansun.requestDto.user",
                        "com.mansun.responseDto.user"
                ).build();
    }

    @Bean
    public GroupedOpenApi BoardApi(){
        return GroupedOpenApi.builder().group("Board API")
                .packagesToScan(
                        "com.mansun.features.board",
                        "com.mansun.requestDto.board",
                        "com.mansun.responseDto.board"
                ).build();
    }

    @Bean
    public GroupedOpenApi FishApi(){
        return GroupedOpenApi.builder().group("Board API")
                .packagesToScan(
                        "com.mansun.features.fish",
                        "com.mansun.requestDto.fish",
                        "com.mansun.responseDto.fish"
                ).build();
    }

    @Bean
    public GroupedOpenApi BadgeApi(){
        return GroupedOpenApi.builder().group("Board API")
                .packagesToScan(
                        "com.mansun.features.badge",
                        "com.mansun.requestDto.badge",
                        "com.mansun.responseDto.badge"
                ).build();
    }

    @Bean
    public GroupedOpenApi FishingPointApi(){
        return GroupedOpenApi.builder().group("Board API")
                .packagesToScan(
                        "com.mansun.features.fishingPoint",
                        "com.mansun.requestDto.fishingPoint",
                        "com.mansun.responseDto.fishingPoint"
                ).build();
    }

    @Bean
    public GroupedOpenApi FollowApi(){
        return GroupedOpenApi.builder().group("Board API")
                .packagesToScan(
                        "com.mansun.features.follow",
                        "com.mansun.requestDto.follow",
                        "com.mansun.responseDto.follow"
                ).build();
    }


    @Bean
    public GroupedOpenApi publicApi(){
        return GroupedOpenApi.builder().group("All API").packagesToScan("com.mansun").build();
    }
}
