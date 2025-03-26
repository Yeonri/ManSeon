package com.mansun.responseDto.board;

import lombok.Builder;
import lombok.Getter;

@Builder
public class FindMyBoardListResDto {
    Long boardId;
    String title;
    String content;
}
