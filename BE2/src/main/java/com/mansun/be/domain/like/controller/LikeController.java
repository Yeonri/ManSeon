package com.mansun.be.domain.like.controller;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.domain.like.service.LikeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/{boardId}/likes")
    public ResponseEntity<ApiResponse<Void>> toggleLike(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long boardId,
            HttpServletRequest request) {

        return likeService.toggleLike(boardId, userDetails, request);
    }
}
