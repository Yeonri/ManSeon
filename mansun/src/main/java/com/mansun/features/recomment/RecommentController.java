package com.mansun.features.recomment;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.recomment.service.RecommentServiceImpl;
import com.mansun.requestDto.recomment.createRecommentReqDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recomment")
@RequiredArgsConstructor
@Tag(name = "RecommentController",description = "대댓글의 CUD를 담당하는 컨트롤러(조회 기능은 게시판에서 일괄 처리 예정)")
public class RecommentController {
    private final RecommentServiceImpl service;

    @Operation(summary = "대댓글 추가")
    @PostMapping
    public ResponseEntity<String> createRecomment(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            createRecommentReqDto req){

        service.createRecomment();
        return ResponseEntity.ok("대댓글이 게시되었습니다");
    }
}
