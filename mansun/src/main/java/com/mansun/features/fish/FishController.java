package com.mansun.features.fish;

import com.mansun.common.auth.CustomUserDetails;

import com.mansun.features.fish.service.FishTypeServiceImpl;

import com.mansun.requestDto.fish.CreateFishTypeReqDto;
import com.mansun.responseDto.OnlyMessageResDto;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fish")
@RequiredArgsConstructor
public class FishController {
	private final FishTypeServiceImpl fishTypeService;

	// 어종은 추가될 뿐 수정되거나 삭제되지 않는다. 
	@Operation(summary = "전체 어종의 추가 기능")
	@PostMapping
	public ResponseEntity<OnlyMessageResDto> addNewFishType(CreateFishTypeReqDto req) {

		return ResponseEntity.ok(new OnlyMessageResDto("성공적으로 어종이 추가되었습니다."));
	}
}
