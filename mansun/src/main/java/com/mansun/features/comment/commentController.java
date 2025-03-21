package com.mansun.features.comment;

import com.mansun.features.comment.service.CommentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
@Tag(name = "CommentController",description = "댓글의 CRUD를 담당하는 컨트롤러")
public class CommentController {
    private final CommentService commentService;


}
