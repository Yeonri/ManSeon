package com.mansun.be.domain.follow.service.etc;

import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.common.response.ApiResponseUtil;
import com.mansun.be.domain.follow.dto.response.UserSummary;
import com.mansun.be.domain.follow.entity.Following;
import com.mansun.be.domain.follow.repository.FollowingRepository;

import com.mansun.be.domain.user.entity.User;
import com.mansun.be.domain.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FollowingService {

    private final FollowingRepository followingRepository;
    private final UserRepository userRepository;

    public void create(Long meId, Long targetUserId) {

        User me = userRepository.findById(meId)
                .orElseThrow(() -> new NoSuchElementException("내 정보가 없습니다."));
        User target = userRepository.findById(targetUserId)
                .orElseThrow(() -> new NoSuchElementException("팔로우 대상이 없습니다."));

        if (followingRepository.existsByUserAndFollowingUser(me, target)) {
            return;
        }

        Following f = Following.create(me, target);
        followingRepository.save(f);
    }

    public void delete(Long meId, Long targetUserId) {
        User me = userRepository.findById(meId)
                .orElseThrow(() -> new NoSuchElementException("내 정보가 없습니다."));
        User target = userRepository.findById(targetUserId)
                .orElseThrow(() -> new NoSuchElementException("대상 유저가 없습니다."));

        followingRepository.deleteByUserAndFollowingUser(me, target);
    }

    public ResponseEntity<ApiResponse<List<UserSummary>>> getFollowingList(Long userId, HttpServletRequest request) {
        List<Following> followings = followingRepository.findAllByUser_UserId(userId);
        List<UserSummary> result = followings.stream()
                .map(f -> UserSummary.from(f.getFollowingUser()))
                .collect(Collectors.toList());

        return ApiResponseUtil.success(result, "팔로잉 목록 조회 성공", HttpStatus.OK, request.getRequestURI());
    }
}