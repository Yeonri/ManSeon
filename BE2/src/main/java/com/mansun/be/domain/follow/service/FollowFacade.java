package com.mansun.be.domain.follow.service;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.common.response.ApiResponseUtil;
import com.mansun.be.domain.follow.dto.response.UserSummary;
import com.mansun.be.domain.follow.service.etc.FollowerService;
import com.mansun.be.domain.follow.service.etc.FollowingService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowFacade {

    private final FollowerService followerService;
    private final FollowingService followingService;

    public ResponseEntity<ApiResponse<Void>> follow(
            CustomUserDetails userDetails,
            Long targetUserId,
            HttpServletRequest request) {

        followingService.create(userDetails.getUserId(), targetUserId);
        followerService.create(targetUserId, userDetails.getUserId());

        return ApiResponseUtil.success(null, "팔로우 성공", HttpStatus.CREATED, request.getRequestURI());
    }

    public ResponseEntity<ApiResponse<Void>> unfollow(
            CustomUserDetails userDetails,
            Long targetUserId,
            HttpServletRequest request) {

        followingService.delete(userDetails.getUserId(), targetUserId);
        followerService.delete(targetUserId, userDetails.getUserId());

        return ApiResponseUtil.success(null, "언팔로우 성공", HttpStatus.OK, request.getRequestURI());
    }

    public ResponseEntity<ApiResponse<List<UserSummary>>> getFollowers(
            CustomUserDetails userDetails,
            HttpServletRequest request) {

        return followerService.getFollowerList(userDetails.getUserId(), request);
    }

    public ResponseEntity<ApiResponse<List<UserSummary>>> getFollowings(
            CustomUserDetails userDetails,
            HttpServletRequest request) {

        return followingService.getFollowingList(userDetails.getUserId(), request);
    }
}