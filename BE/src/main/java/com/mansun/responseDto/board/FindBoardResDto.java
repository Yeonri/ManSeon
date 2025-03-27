package com.mansun.responseDto.board;

import lombok.Builder;
import lombok.Getter;

@Builder
public class FindBoardResDto {
    String title;
    String content;
}
