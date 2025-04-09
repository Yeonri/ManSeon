package com.mansun.be.domain.board.dto.request;

import lombok.Getter;

@Getter
public class UpdateBoardRequest {
    private String title;
    private String content;
    private String postImg;
}

