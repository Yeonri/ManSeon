package com.mansun.be.domain.fish.service;

import com.mansun.be.common.auth.CustomUserDetails;
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

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class FishService {

    private final FishRepository fishRepository;
    private final FishTypeRepository fishTypeRepository;
    private final UserRepository userRepository;

    public ResponseEntity<ApiResponse<Void>> createFish(CustomUserDetails userDetails, FishCreateRequest dto, HttpServletRequest request) {

        User user = userRepository.findByUserIdAndDeletedFalse(userDetails.getUserId())
                .orElseThrow(() -> new NoSuchElementException("유저를 찾을 수 없습니다."));

        FishType fishType = fishTypeRepository.findById(dto.getFishTypeId())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 물고기 종류 입니당."));

        Fish fish = Fish.create(user, fishType, dto);
        fishRepository.save(fish);

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
}
