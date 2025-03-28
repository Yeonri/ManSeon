package com.mansun.features.point;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.point.fishingpoint.service.FishingPointServiceImpl;
import com.mansun.features.point.userpoint.service.UserPointServiceImpl;
import com.mansun.requestDto.fishingpoint.CreateFishingPointReqDto;
import com.mansun.requestDto.fishingpoint.CreateUserPointReqDto;
import com.mansun.requestDto.fishingpoint.SearchPointReqDto;
import com.mansun.responseDto.OnlyMessageResDto;
import com.mansun.responseDto.fishingPoint.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
    public ResponseEntity<OnlyMessageResDto> createAllPointList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody CreateFishingPointReqDto req) {
        fishingPointService.createAllPoint(req);
        return ResponseEntity.ok(new OnlyMessageResDto("전체 낚시 포인트에 추가되었습니다"));
    }

    @Operation(summary = "전체 리스트를 찾는 것")
    @GetMapping("/list/all")
    public ResponseEntity<List<AllPointResDto>> getOneOfAllPointList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(fishingPointService.findAllPointList());
    }

    @Operation(summary = "전체 리스트 중 하나의 포인트를 찾는 것")
    @GetMapping("/point/all")
    public ResponseEntity<OnePointResDto> getOnePoint(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam("point_id") Long pointId) {
        return ResponseEntity.ok(fishingPointService.findOnePoint(pointId));
    }

    @Operation(summary = "한 사용자의 UserPoint를 추가한다.")
    @PostMapping("/list/my")
    public ResponseEntity<OnlyMessageResDto> createUserPoint(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody CreateUserPointReqDto req) {
        userPointService.createUserPoint(customUserDetails, req);
        return ResponseEntity.ok(new OnlyMessageResDto("내 포인트가 추가되었습니다."));
    }


    @Operation(summary = "한 사용자의 UserPoint를 불러온다.")
    @GetMapping("/list/my")
    public ResponseEntity<List<UserPointListResDto>> getUserPointList(
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

    @Operation(summary = "상세 낚시 포인트 정보 불러오기, 시간별 예보,물 때 정보, 이 포인트에서 내가 잡은 물고기")
    @GetMapping("/point/info")
    public ResponseEntity<OnePointDetailInfoResDto> getDetailInfoPoint(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam("point_id") Long pointId
    ) {
        return ResponseEntity.ok(fishingPointService.findOnePointDetailInfo(customUserDetails, pointId));
    }
}