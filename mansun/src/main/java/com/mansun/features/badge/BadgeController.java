package com.mansun.features.badge;

import com.mansun.features.badge.service.BadgeServiceImpl;
import com.mansun.requestDto.badge.CreateBadgeReqDto;
import com.mansun.requestDto.badge.deleteBadgesReqDto;
import com.mansun.requestDto.badge.updateBadgeReqDto;
import com.mansun.responseDto.badges.allBadgeListResDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/badge")
@RequiredArgsConstructor
@Tag(name = "BadgeController",description = "전체 뱃지 및 유저 뱃지의 CRUD를 관리하는 컨트롤러")
public class BadgeController {
    private final BadgeServiceImpl service;

    //전체 뱃지에서 단일 뱃지 추가
    @PostMapping("/all")
    public ResponseEntity<String> createNewBadge(@RequestBody CreateBadgeReqDto req){
        service.createBadge(req);
        return ResponseEntity.ok("뱃지가 추가되었습니다");
    }

    //전체 뱃지 조회
    @GetMapping("/all")
    public ResponseEntity<List<allBadgeListResDto>> allBadgeList(){
        return ResponseEntity.ok(service.allBadgeList()) ;
    }

    //전체 뱃지에서 단일 뱃지 수정
    @PatchMapping("/all/")
    public ResponseEntity<String> updateOneOfAllBadge(@RequestBody updateBadgeReqDto req){
        service.updateBadge(req);
        return ResponseEntity.ok("뱃지가 수정되었습니다");
    }

    //전체 뱃지에서 단일 뱃지 삭제
    @DeleteMapping("/all")
    public ResponseEntity<String> deleteOneOfAllBadge(@RequestBody deleteBadgesReqDto req){
        service.deleteBadge();
        return ResponseEntity.ok("뱃지가 삭제되었습니다");
    }
}
