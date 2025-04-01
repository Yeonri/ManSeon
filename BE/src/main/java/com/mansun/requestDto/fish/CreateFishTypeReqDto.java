package com.mansun.requestDto.fish;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class CreateFishTypeReqDto {
    @Schema(defaultValue = "이진형은 물고기")
    String fishName;
    @Schema(defaultValue = "이진형집")
    String fishPlace;
    @Schema(defaultValue = "이진형은 바보다")
    String characteristic;
}
