package com.mansun.features.recomment;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.recomment.service.RecommentServiceImpl;
import com.mansun.requestDto.recomment.CreateRecommentReqDto;
import com.mansun.requestDto.recomment.DeleteRecommentReqDto;
import com.mansun.requestDto.recomment.UpdateRecommentReqDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
            @Valid CreateRecommentReqDto req){

        service.createRecomment();
        return null;
    }

    @Operation(summary = "대댓글 수정")
    @PatchMapping
    public ResponseEntity<String> updateRecomment(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            UpdateRecommentReqDto req){
        service.updateRecomment();
        return null;
    }

    @Operation(summary = "대댓글 삭제")
    @DeleteMapping
    public ResponseEntity<String> deleteRecomment(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            DeleteRecommentReqDto req){
        service.deleteRecomment();
        return null;
    }
}
