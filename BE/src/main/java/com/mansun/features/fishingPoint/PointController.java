package com.mansun.features.fishingPoint;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.fishingPoint.service.FishingPointServiceImpl;
import com.mansun.features.fishingPoint.service.UserPointServiceImpl;
import com.mansun.requestDto.fishingpoint.CreateUserPointReqDto;
import com.mansun.requestDto.fishingpoint.SearchPointReqDto;
import com.mansun.responseDto.OnlyMessageResDto;
import com.mansun.responseDto.fishingPoint.FindUserPointListResDto;
import com.mansun.responseDto.fishingPoint.OnePointResDto;
import com.mansun.responseDto.fishingPoint.SearchPointResDto;
import com.mansun.responseDto.fishingPoint.allPointResDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fishingpoint")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "FishingPointController", description = "FishingPoint를 관리하는 컨트롤러")
public class PointController {
    private final UserPointServiceImpl userPointService;
    private final FishingPointServiceImpl fishingPointService;

    @Operation(summary = "한 사용자의 UserPoint를 추가한다.")
    @PostMapping("/list/my")
    public ResponseEntity<OnlyMessageResDto> createUserPoint(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            CreateUserPointReqDto req) {
        userPointService.createUserPoint(customUserDetails, req);
        return ResponseEntity.ok(new OnlyMessageResDto("내 포인트가 추가되었습니다."));
    }

    @Operation(summary = "한 사용자의 UserPoint를 불러온다.")
    @GetMapping("/list/my")
    public ResponseEntity<List<FindUserPointListResDto>> getUserPointList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(userPointService.findUserPointList(customUserDetails));
    }


    @DeleteMapping("/list/my")
    public ResponseEntity<OnlyMessageResDto> deleteUserPoint(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        userPointService.deleteUserPoint(customUserDetails);
        return ResponseEntity.ok(new OnlyMessageResDto("정상적으로 삭제되었습니다."));
    }

    @GetMapping("/search")
    public ResponseEntity<List<SearchPointResDto>> searchFishingPointList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            SearchPointReqDto req) {
        return ResponseEntity.ok(fishingPointService.searchFishingPointList(customUserDetails, req));
    }

    @Operation(summary = "전체 리스트를 찾는 것")
    @GetMapping("/list/all")
    public ResponseEntity<List<allPointResDto>> getAllPointList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(fishingPointService.findAllPointList());
    }

    @Operation(summary = "전체 리스트 중 하나의 포인트를 찾는 것")
    @GetMapping("/point/all")
    public ResponseEntity<OnePointResDto> getOnePoint(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            Long pointId) {
        return ResponseEntity.ok(fishingPointService.findOnePoint(pointId));
    }
}
