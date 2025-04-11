package com.mansun.be.domain.multte.controller;

import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.common.response.ApiResponseUtil;
import com.mansun.be.domain.multte.dto.response.MultteResultResponse;
import com.mansun.be.domain.multte.service.MultteService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/multte")
public class MultteController {

    private final MultteService multteService;

    @GetMapping("/top5")
    public ResponseEntity<ApiResponse<List<MultteResultResponse>>> getTop5Elbo(
            HttpServletRequest request
    ) {
        List<MultteResultResponse> result = multteService.getTop5ElboAt(LocalDateTime.now().withMinute(0).withSecond(0).withNano(0));
        return ApiResponseUtil.success(result, "elbo_score 상위 5개 조회 성공", HttpStatus.OK, request.getRequestURI());
    }
}

