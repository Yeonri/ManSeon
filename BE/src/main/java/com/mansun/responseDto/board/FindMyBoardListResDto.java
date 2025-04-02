package com.mansun.responseDto.board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
public class FindMyBoardListResDto {
    Long boardId;
    String title;
    String content;
}
