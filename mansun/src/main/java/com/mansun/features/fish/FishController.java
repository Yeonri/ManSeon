package com.mansun.features.fish;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.fish.service.FishServiceImpl;
import com.mansun.features.fish.service.FishTypeServiceImpl;

import com.mansun.requestDto.fish.CreateFishTypeReqDto;
import com.mansun.requestDto.fish.CreateFishReqDto;
import com.mansun.requestDto.fish.FindFishReqDto;
import com.mansun.responseDto.OnlyMessageResDto;

import com.mansun.responseDto.fish.FindFishListResDto;
import com.mansun.responseDto.fish.FindFishResDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fishes")
@RequiredArgsConstructor
public class FishController {
	private final FishServiceImpl fishService;
	private final FishTypeServiceImpl fishTypeService;

	// 어종은 추가될 뿐 수정되거나 삭제되지 않는다. 
	@Operation(summary = "전체 어종의 추가 기능")
	@PostMapping("/fishType/add")
	public ResponseEntity<OnlyMessageResDto> addNewFishType(CreateFishTypeReqDto req) {
		fishTypeService.addNewFishType(req);
		return ResponseEntity.ok(new OnlyMessageResDto("성공적으로 어종이 추가되었습니다."));
	}

	@Operation(summary = "내 물고기 도감 추가")
	@PostMapping("/fish/add")
	public ResponseEntity<OnlyMessageResDto> createFish(
			@AuthenticationPrincipal CustomUserDetails customUserDetails,
			CreateFishReqDto req){
		fishService.createFish(customUserDetails,req);
		return ResponseEntity.ok(new OnlyMessageResDto("내 기록이 정상적으로 추가되었습니다")); }

	@Operation(summary = "내 물고기 도감 리스트 열람")
	@GetMapping("/list/my")
	public ResponseEntity<List<FindFishListResDto>> getMyFishList(
			@AuthenticationPrincipal CustomUserDetails customUserDetails
			){
			List<FindFishListResDto> myList=fishService.findMyFishList(customUserDetails);
			return ResponseEntity.ok(myList);

	}
	@Operation(summary = "타인 물고기 도감 리스트 열람")
	@GetMapping("/list/other")
	public ResponseEntity<List<FindFishListResDto>> getOtherFishList(
			@AuthenticationPrincipal CustomUserDetails customUserDetails,
			@RequestParam(value = "user_id") Long userId
	){
		List<FindFishListResDto> otherList=fishService.findOthersFishList(customUserDetails,userId);
		return ResponseEntity.ok(otherList);
	}
	@Operation(summary = "내 물고기 도감 상세 열람")
	@GetMapping("/detail/my")
	public ResponseEntity<FindFishResDto> getMyFishDetail(
			@AuthenticationPrincipal CustomUserDetails customUserDetails,
			@RequestParam("fish_id") Long fishId){
		return ResponseEntity.ok(fishService.findMyFish(customUserDetails, fishId));
	}

	@Operation(summary = "타인 물고기 도감 상세 열람")
	@GetMapping("/detail/other")
	public ResponseEntity<FindFishResDto> getMyFishDetail(
			@AuthenticationPrincipal CustomUserDetails customUserDetails,
			@RequestParam(value = "user_id") Long userId,
			@RequestParam("fish_id") Long fishId){
		return ResponseEntity.ok(fishService.findOtherFish(customUserDetails,userId,fishId));
	}
}
