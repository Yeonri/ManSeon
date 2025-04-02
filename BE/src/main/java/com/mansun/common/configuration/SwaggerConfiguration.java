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

    // Bearer 방식 설정
//    @Bean
//    public OpenAPI bearerOpenAPI() {
//        SecurityScheme bearerScheme = new SecurityScheme()
//                .type(SecurityScheme.Type.HTTP)
//                .scheme("bearer")
//                .bearerFormat("JWT")
//                .in(SecurityScheme.In.HEADER)
//                .name("Authorization");
//
//        SecurityRequirement securityRequirement = new SecurityRequirement().addList("BearerAuth");
//
//        Info info = new Info().title("SSAFY 특화 프로젝트 API 명세서 (Bearer)").version("V3")
//                .contact(new io.swagger.v3.oas.models.info.Contact().name("Jinny"));
//
//        return new OpenAPI()
//                .components(new Components().addSecuritySchemes("BearerAuth", bearerScheme))
//                .addSecurityItem(securityRequirement)
//                .info(info);
//    }

    // 텍스트 방식 설정 (Bearer prefix 없음)
    @Bean
    public OpenAPI textTokenOpenAPI() {
        SecurityScheme textScheme = new SecurityScheme()
                .type(SecurityScheme.Type.APIKEY) // 👈 여기 변경!
                .in(SecurityScheme.In.HEADER)
                .name("Authorization");

        SecurityRequirement securityRequirement = new SecurityRequirement().addList("TextAuth");

        Info info = new Info().title("SSAFY 특화 프로젝트 API 명세서 (Text Token)").version("V3")
                .contact(new io.swagger.v3.oas.models.info.Contact().name("Jinny"));

        return new OpenAPI()
                .components(new Components().addSecuritySchemes("TextAuth", textScheme))
                .addSecurityItem(securityRequirement)
                .info(info);
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
                        "com.mansun.responseDto.user")
                .build();
    }

    @Bean
    public GroupedOpenApi BoardApi(){
        return GroupedOpenApi.builder().group("Board API")
                .packagesToScan(
                        "com.mansun.features.board",
                        "com.mansun.requestDto.board",
                        "com.mansun.responseDto.board")
                .build();
    }

    @Bean
    public GroupedOpenApi FishApi(){
        return GroupedOpenApi.builder().group("Fish API")
                .packagesToScan(
                        "com.mansun.features.fish",
                        "com.mansun.requestDto.fish",
                        "com.mansun.responseDto.fish")
                .build();
    }

    @Bean
    public GroupedOpenApi BadgeApi(){
        return GroupedOpenApi.builder().group("Badge API")
                .packagesToScan(
                        "com.mansun.features.badge",
                        "com.mansun.requestDto.badge",
                        "com.mansun.responseDto.badge")
                .build();
    }

    @Bean
    public GroupedOpenApi FishingPointApi(){
        return GroupedOpenApi.builder().group("FishingPoint API")
                .packagesToScan(
                        "com.mansun.features.fishingPoint",
                        "com.mansun.requestDto.fishingPoint",
                        "com.mansun.responseDto.fishingPoint")
                .build();
    }

    @Bean
    public GroupedOpenApi FollowApi(){
        return GroupedOpenApi.builder().group("Follow API")
                .packagesToScan(
                        "com.mansun.features.follow",
                        "com.mansun.requestDto.follow",
                        "com.mansun.responseDto.follow")
                .build();
    }

    @Bean
    public GroupedOpenApi publicApi(){
        return GroupedOpenApi.builder().group("All API")
                .packagesToScan("com.mansun")
                .build();
    }
}
