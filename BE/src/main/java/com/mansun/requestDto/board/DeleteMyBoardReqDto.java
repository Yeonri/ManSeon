package com.mansun.requestDto.board;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class DeleteMyBoardReqDto {
   @Schema(defaultValue = "1")
   private Long boardId;
}
