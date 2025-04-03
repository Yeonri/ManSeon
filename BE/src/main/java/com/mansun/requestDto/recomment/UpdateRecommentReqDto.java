package com.mansun.requestDto.recomment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class UpdateRecommentReqDto {
    @Schema(defaultValue = "1")
    Long recommentId;
}
