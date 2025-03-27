package com.mansun.requestDto.fish;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CreateFishTypeReqDto {
    private String fishName;
    private String fishPlace;
    private String characteristic;
}
