package com.mansun.responseDto.board;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
@Builder
@Getter
public class findMyBoardListResDto {
    String title;
    String content;
}
