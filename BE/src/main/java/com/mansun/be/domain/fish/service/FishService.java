package com.mansun.be.domain.fish.service;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.imageUtil.ImageSaveManager;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.common.response.ApiResponseUtil;
import com.mansun.be.domain.fish.dto.request.FishCreateRequest;
import com.mansun.be.domain.fish.dto.response.FishResponse;
import com.mansun.be.domain.fish.entity.Fish;
import com.mansun.be.domain.fish.entity.FishType;
import com.mansun.be.domain.fish.repository.FishRepository;
import com.mansun.be.domain.fish.repository.FishTypeRepository;
import com.mansun.be.domain.user.entity.User;
import com.mansun.be.domain.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class FishService {

    private final FishRepository fishRepository;
    private final FishTypeRepository fishTypeRepository;
    private final UserRepository userRepository;

    public ResponseEntity<ApiResponse<Void>> createFish(CustomUserDetails userDetails,
                                                        FishCreateRequest dto,
                                                        MultipartFile image,
                                                        HttpServletRequest request) {

        User user = userRepository.findByUserIdAndDeletedFalse(userDetails.getUserId())
                .orElseThrow(() -> new NoSuchElementException("유저를 찾을 수 없습니다."));

        FishType fishType = fishTypeRepository.findByFishName("광어")
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 물고기 종류입니다."));

        // 1. 먼저 Fish 엔티티 저장 (ID 확보를 위해)
        Fish fish = Fish.builder()
                .user(user)
                .fishType(fishType)
                .lat(dto.getLat())
                .lng(dto.getLng())
                .size(dto.getSize())
                .bait(dto.getBait())
                .equipment(dto.getEquipment())
                .createdAt(LocalDateTime.now())
                .build();

        fishRepository.save(fish);

        // 2. 이미지가 있다면 저장하고 URL 등록
        if ( dto.getImage() != null && !dto.getImage().isEmpty()) {
            ImageSaveManager.processAndSaveImage(1, fish.getFishId(), dto.getImage());
            String fishImgUrl = "/fish/" + fish.getFishId() + ".jpg";
            fish.setFishImg(fishImgUrl);
        }

        return ApiResponseUtil.success(null, "물고기 등록 성공", HttpStatus.CREATED, request.getRequestURI());
    }


    public ResponseEntity<ApiResponse<List<FishResponse>>> getMyFishes(
            CustomUserDetails userDetails,
            HttpServletRequest request) {

        User user = userRepository.findByUserIdAndDeletedFalse(userDetails.getUserId())
                .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다."));

        List<Fish> fishes = fishRepository.findAllByUserAndDeletedFalseOrderByCreatedAtDesc(user);

        List<FishResponse> responses = fishes.stream()
                .map(FishResponse::from)
                .toList();

        return ApiResponseUtil.success(responses, "물고기 조회 성공", HttpStatus.OK, request.getRequestURI());
    }

    public ResponseEntity<ApiResponse<List<FishResponse>>> getFishesByUser(
            CustomUserDetails viewer,
            Long targetUserId,
            HttpServletRequest request) {

        // 조회 대상 유저
        User targetUser = userRepository.findByUserIdAndDeletedFalse(targetUserId)
                .orElseThrow(() -> new NoSuchElementException("대상 사용자를 찾을 수 없습니다."));

        // 요청자(나)
        User me = userRepository.findByUserIdAndDeletedFalse(viewer.getUserId())
                .orElseThrow(() -> new NoSuchElementException("조회자를 찾을 수 없습니다."));

        // 팔로우 여부 확인
        boolean isFollowing = targetUser.getFollowers().stream()
                .anyMatch(follow -> follow.getUser().getUserId().equals(me.getUserId()));

        if (!isFollowing) {
            return ApiResponseUtil.failure("해당 유저를 팔로우하지 않아 조회할 수 없습니다.",
                    HttpStatus.FORBIDDEN, request.getRequestURI());
        }

        // 물고기 조회
        List<Fish> fishes = fishRepository.findAllByUserAndDeletedFalseOrderByCreatedAtDesc(targetUser);
        List<FishResponse> responses = fishes.stream().map(FishResponse::from).toList();

        return ApiResponseUtil.success(responses, "물고기 조회 성공", HttpStatus.OK, request.getRequestURI());
    }


}
