package com.mansun.responseDto.board;

import com.mansun.entity.board.Board;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class allBoardListResDto{
    String id;
    String title;
    String content;
    LocalDateTime createdAt;
    String postImg;
    String limeNum;
    String commentNum;
}
