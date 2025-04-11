package com.mansun.be.domain.board.dto.request;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class UpdateBoardRequest {
    private String title;
    private String content;
}
