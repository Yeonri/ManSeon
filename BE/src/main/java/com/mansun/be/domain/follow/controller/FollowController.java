package com.mansun.be.domain.follow.controller;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.domain.follow.dto.response.UserSummary;
import com.mansun.be.domain.follow.service.FollowFacade;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follow")
public class FollowController {

    private final FollowFacade followFacade;

    @PostMapping("/{targetUserId}")
    public ResponseEntity<ApiResponse<Void>> follow(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long targetUserId,
            HttpServletRequest request) {

        return followFacade.follow(userDetails, targetUserId, request);
    }

    @DeleteMapping("/{targetUserId}")
    public ResponseEntity<ApiResponse<Void>> unfollow(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long targetUserId,
            HttpServletRequest request) {
        return followFacade.unfollow(userDetails, targetUserId, request);
    }

    @GetMapping("/followers")
    public ResponseEntity<ApiResponse<List<UserSummary>>> getFollowers(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            HttpServletRequest request) {
        return followFacade.getFollowers(userDetails, request);
    }

    @GetMapping("/followings")
    public ResponseEntity<ApiResponse<List<UserSummary>>> getFollowings(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            HttpServletRequest request) {
        return followFacade.getFollowings(userDetails, request);
    }
}