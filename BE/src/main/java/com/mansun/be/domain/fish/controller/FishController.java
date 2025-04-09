package com.mansun.be.domain.fish.controller;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.domain.fish.dto.request.FishCreateRequest;
import com.mansun.be.domain.fish.dto.response.FishResponse;
import com.mansun.be.domain.fish.service.FishService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fishes")
@RequiredArgsConstructor
public class FishController {

    private final FishService fishService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createFish(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody FishCreateRequest requestDto,
            HttpServletRequest request) {

        return fishService.createFish(userDetails, requestDto, request);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<FishResponse>>> getFishes(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            HttpServletRequest request) {

        return fishService.getMyFishes(userDetails, request);
    }
}
