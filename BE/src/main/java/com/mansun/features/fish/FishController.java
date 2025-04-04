package com.mansun.features.fish;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.fish.service.FishServiceImpl;
import com.mansun.features.fish.service.FishTypeServiceImpl;
import com.mansun.requestDto.fish.CreateFishReqDto;
import com.mansun.requestDto.fish.CreateFishTypeReqDto;
import com.mansun.responseDto.MessageResDto;
import com.mansun.responseDto.fish.FindFishListResDto;
import com.mansun.responseDto.fish.FindFishResDto;
import com.mansun.responseDto.fish.collection.CollectionListResDto;
import com.mansun.responseDto.fishingPoint.FindFishDiaryListResDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/fishes")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "FishController",description = "전체 어종 및 포획한 물고기의 CRUD를 담당하는 컨트롤러")
public class FishController {
    private final FishServiceImpl fishService;
    private final FishTypeServiceImpl fishTypeService;

    // 어종은 추가될 뿐 수정되거나 삭제되지 않는다.
    @Operation(summary = "전체 어종의 추가 기능")
    @PostMapping("/fishtype/add")
    public ResponseEntity<MessageResDto> addNewFishType(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody CreateFishTypeReqDto req) {
        fishTypeService.addNewFishType(req);
        return ResponseEntity.ok(new MessageResDto("성공적으로 어종이 추가되었습니다."));
    }

    @Operation(summary = "내 물고기 일기 추가")
    @PostMapping("/diary/my")
    public ResponseEntity<MessageResDto> createFish(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody CreateFishReqDto req) {
        fishService.createFish(customUserDetails, req);
        return ResponseEntity.ok(new MessageResDto("내 기록이 정상적으로 추가되었습니다"));
    }

    @Operation(summary = "내 물고기 일기 리스트 열람")
    @GetMapping("/diary/my")
    public ResponseEntity<Map<LocalDate,List<FindFishDiaryListResDto>>> getMyFishDiaryList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return ResponseEntity.ok(fishService.findMyFishDiaryList(customUserDetails));
    }

    @Operation(summary = "타인 물고기 일기 리스트 열람")
    @GetMapping("/diary/other")
    public ResponseEntity<List<FindFishDiaryListResDto>> getOtherFishDiaryList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam(value = "user_id") Long userId
    ) {
        return ResponseEntity.ok(fishService.findOthersFishDiaryList(customUserDetails, userId));
    }

    @Operation(summary = "내 물고기 일기 상세 열람")
    @GetMapping("/diary/detail/my")
    public ResponseEntity<FindFishResDto> getMyFishDiaryDetail(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam("fish_id") Long fishId) {
        return ResponseEntity.ok(fishService.findMyFish(customUserDetails, fishId));
    }

    @Operation(summary = "타인 물고기 일기 상세 열람")
    @GetMapping("/diary/detail/other")
    public ResponseEntity<FindFishResDto> getOtherFishDiaryDetail(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam(value = "user_id") Long userId,
            @RequestParam("fish_id") Long fishId) {
        return ResponseEntity.ok(fishService.findOtherFish(customUserDetails, userId, fishId));
    }

    @Operation(summary = "내 물고기 도감 리스트")
    @GetMapping("/list/my")
    public ResponseEntity<List<CollectionListResDto>> getMyFishList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(fishService.findMyCollectionList(customUserDetails));
    }

    @Operation(summary = "타인 물고기 도감 리스트")
    @GetMapping("/list/other")
    public ResponseEntity<List<FindFishListResDto>> getOtherFishList(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam("user_id") Long userId) {
        return ResponseEntity.ok(fishService.findOtherFishList(customUserDetails,userId));
    }
}
