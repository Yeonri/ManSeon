package com.mansun.features.recomment;

import com.mansun.features.recomment.service.RecommentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recomment")
@RequiredArgsConstructor
public class RecommentController {
    private final RecommentServiceImpl service;

    @PostMapping
    public ResponseEntity<String> createRecomment(){
        return ResponseEntity.ok("대댓글이 게시되었습니다");
    }
}
