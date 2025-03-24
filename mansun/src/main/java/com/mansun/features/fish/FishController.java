package com.mansun.features.fish;

import com.mansun.features.fish.service.FishTypeServiceImpl;
import com.mansun.requestDto.fish.CreateFishReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fish")
@RequiredArgsConstructor
public class FishController {
    private final FishTypeServiceImpl fishTypeService;

    @PostMapping
    public ResponseEntity<String> addNewFish(CreateFishReqDto req){

        return ResponseEntity.ok("성공적으로 어종이 추가되었습니다.");
    }

}
