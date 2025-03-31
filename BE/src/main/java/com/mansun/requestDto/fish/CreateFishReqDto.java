package com.mansun.requestDto.fish;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Getter
public class CreateFishReqDto {
    @Schema(defaultValue = "131")
    float lat;
    @Schema(defaultValue="37")
    float lng;
    @Schema(defaultValue="100.23")
    float size;
    @Schema(defaultValue="지렁이")
    String bait;
    @Schema(defaultValue = "찌")
    String equipment;
    @Schema(defaultValue = "img Url")
    String fishImg;
}
