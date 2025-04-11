package com.mansun.be.domain.point.controller;


import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.response.MessageResDto;
import com.mansun.be.domain.point.dto.request.CreateFishingPointReqDto;
import com.mansun.be.domain.point.dto.request.CreateUserPointReqDto;
import com.mansun.be.domain.point.dto.response.*;
import com.mansun.be.domain.point.dto.response.allPoint.AllPointResDto;
import com.mansun.be.domain.point.fishingpoint.service.FishingPointServiceImpl;
import com.mansun.be.domain.point.userpoint.service.UserPointServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fishing_point")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "FishingPointController", description = "FishingPoint를 관리하는 컨트롤러")
public class PointController {
    private final UserPointServiceImpl userPointService;
    private final FishingPointServiceImpl fishingPointService;

    @Operation(summary = "전체 리스트에 어떤 포인트를 추가하는 것")
    @PostMapping("/list/all")
    public ResponseEntity<MessageResDto> createAllPointList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @Valid @RequestBody CreateFishingPointReqDto req) {
        fishingPointService.createAllPoint(req);
        return ResponseEntity.ok(new MessageResDto("전체 낚시 포인트에 추가되었습니다"));
    }

    @Operation(summary = "전체 리스트를 찾는 것")
    @GetMapping("/list/all")
    public ResponseEntity<List<AllPointResDto>> getAllPointList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(fishingPointService.findAllPointList(customUserDetails));
    }

    @Operation(summary = "포인트의 날씨 정보와 조위 정보를 가져오는 것")
    @GetMapping("/list/detail")
    public ResponseEntity<forecastOnePointResDto> getOneOfAllPointList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam("point_id")Long pointId) {
        return ResponseEntity.ok(fishingPointService.forecastOnePointInfo(customUserDetails,pointId));
    }

    @Operation(summary = "전체 리스트 중 하나의 포인트를 찾는 것")
    @GetMapping("/point/all")
    public ResponseEntity<OnePointResDto> getOnePoint(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam("point_id") Long pointId) {
        return ResponseEntity.ok(fishingPointService.findOnePoint(pointId));
    }

    @Operation(summary = "내 UserPoint를 추가한다.")
    @PostMapping("/list/my")
    public ResponseEntity<MessageResDto> createUserPoint(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @Valid @RequestBody CreateUserPointReqDto req) {
        userPointService.createUserPoint(customUserDetails, req);
        return ResponseEntity.ok(new MessageResDto("내 포인트가 추가되었습니다."));
    }


    @Operation(summary = "내 UserPoint List를 불러온다.")
    @GetMapping("/list/my")
    public ResponseEntity<List<UserPointListResDto>> getUserPointList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(userPointService.findUserPointList(customUserDetails));
    }


    @Operation(summary = "내 리스트에서 UserPoint 삭제")
    @DeleteMapping("/list/my")
    public ResponseEntity<MessageResDto> deleteUserPoint(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        userPointService.deleteUserPoint(customUserDetails);
        return ResponseEntity.ok(new MessageResDto("정상적으로 삭제되었습니다."));
    }

    @Operation(summary = "정확한 포인트 이름으로 포인트 검색하기")
    @GetMapping("/search")
    public ResponseEntity<List<SearchPointResDto>> searchFishingPointList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam("point_name") String pointName) {
        return ResponseEntity.ok(fishingPointService.searchFishingPointList(customUserDetails, pointName));
    }

    @Operation(summary = "상세 낚시 포인트 정보 불러오기, 시간별 예보,물 때 정보, 이 포인트에서 내가 잡은 물고기")
    @GetMapping("/point/info")
    public ResponseEntity<OnePointDetailInfoResDto> getDetailInfoPoint(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam("point_id") Long pointId
    ) {
        return ResponseEntity.ok(fishingPointService.findOnePointDetailInfo(customUserDetails, pointId));
    }

}