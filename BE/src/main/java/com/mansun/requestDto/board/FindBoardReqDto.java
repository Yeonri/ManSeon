package com.mansun.requestDto.board;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FindBoardReqDto {
    @Schema(defaultValue = "1")
    Long boardId;
}
