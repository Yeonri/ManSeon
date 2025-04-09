package com.mansun.be.domain.follow.service.etc;

import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.common.response.ApiResponseUtil;
import com.mansun.be.domain.follow.dto.response.UserSummary;
import com.mansun.be.domain.follow.entity.Follower;
import com.mansun.be.domain.follow.repository.FollowerRepository;

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
public class FollowerService {

    private final FollowerRepository followerRepository;
    private final UserRepository userRepository;

    public void create(Long targetUserId, Long followerUserId) {
        User target = userRepository.findById(targetUserId)
                .orElseThrow(() -> new NoSuchElementException("팔로우 대상 유저가 없습니다."));
        User follower = userRepository.findById(followerUserId)
                .orElseThrow(() -> new NoSuchElementException("팔로우를 시도한 유저가 없습니다."));

        if (followerRepository.existsByUserAndFollower(target, follower)) {
            return; // 중복 방지
        }

        Follower f = Follower.create(target, follower);
        followerRepository.save(f);
    }

    public void delete(Long targetUserId, Long followerUserId) {
        User target = userRepository.findById(targetUserId)
                .orElseThrow(() -> new NoSuchElementException("대상 유저가 없습니다."));
        User follower = userRepository.findById(followerUserId)
                .orElseThrow(() -> new NoSuchElementException("요청한 유저가 없습니다."));

        followerRepository.deleteByUserAndFollower(target, follower);
    }

    public ResponseEntity<ApiResponse<List<UserSummary>>> getFollowerList(Long userId, HttpServletRequest request) {
        List<Follower> followers = followerRepository.findAllByUser_UserId(userId);
        List<UserSummary> result = followers.stream()
                .map(f -> UserSummary.from(f.getFollower()))
                .collect(Collectors.toList());

        return ApiResponseUtil.success(result, "팔로워 목록 조회 성공", HttpStatus.OK, request.getRequestURI());
    }
}
