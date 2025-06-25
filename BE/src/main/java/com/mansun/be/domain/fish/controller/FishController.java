package com.mansun.be.domain.fish.controller;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.domain.fish.dto.request.FishCreateRequest;
import com.mansun.be.domain.fish.dto.response.FishResponse;
import com.mansun.be.domain.fish.service.FishService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/fishes")
@RequiredArgsConstructor
public class FishController {

    private final FishService fishService;
    private final Logger log;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Void>> createFish(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestPart("data") @Valid FishCreateRequest dto,
            @RequestPart(value = "image", required = false) MultipartFile image,
            HttpServletRequest request) {

        log.info("컨트롤러에 도착했어");

        return fishService.createFish(userDetails, dto, image, request);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<FishResponse>>> getFishes(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            HttpServletRequest request) {

        return fishService.getMyFishes(userDetails, request);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<List<FishResponse>>> getFishesByUser(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long userId,
            HttpServletRequest request) {

        return fishService.getFishesByUser(userDetails, userId, request);
    }

}
