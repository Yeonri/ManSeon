package com.mansun.features.badge;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.badge.service.BadgeServiceImpl;
import com.mansun.features.badge.service.UserBadgeServicempl;
import com.mansun.requestDto.badge.CreateBadgeReqDto;
import com.mansun.requestDto.badge.deleteBadgesReqDto;
import com.mansun.requestDto.badge.updateBadgeReqDto;
import com.mansun.responseDto.OnlyMessageResDto;
import com.mansun.responseDto.badges.allBadgeListResDto;
import com.mansun.responseDto.badges.allBadgesByUserResDto;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/badge")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "BadgeController",description = "전체 뱃지 및 유저 뱃지의 CRUD를 관리하는 컨트롤러")
public class BadgeController {
    private final BadgeServiceImpl badgeService;
    private final UserBadgeServicempl userBadgeService;

    //전체 뱃지에서 단일 뱃지 추가
    @PostMapping("/all")
    public ResponseEntity<OnlyMessageResDto> createNewBadge(@RequestBody CreateBadgeReqDto req){
        badgeService.createBadge(req);
        return ResponseEntity.ok(new OnlyMessageResDto("뱃지가 추가되었습니다"));
    }

    //전체 뱃지 조회
    @GetMapping("/all")
    public ResponseEntity<List<allBadgeListResDto>> findAllBadgeList(){
        return ResponseEntity.ok(badgeService.allBadgeList()) ;
    }

    //전체 뱃지에서 단일 뱃지 수정
    @PatchMapping("/all/")
    public ResponseEntity<OnlyMessageResDto> updateOneOfAllBadge(@RequestBody updateBadgeReqDto req){
        badgeService.updateBadge(req);
        return ResponseEntity.ok(new OnlyMessageResDto("뱃지가 수정되었습니다"));
    }

    //전체 뱃지에서 단일 뱃지 삭제
    @DeleteMapping("/all")
    public ResponseEntity<OnlyMessageResDto> deleteOneOfAllBadge(@RequestBody deleteBadgesReqDto req){
        badgeService.deleteBadge();
        return ResponseEntity.ok(new OnlyMessageResDto("뱃지가 삭제되었습니다"));
    }

    //각 사용자의 뱃지 추가
    @PostMapping
    public ResponseEntity<OnlyMessageResDto> addBadgeByUser(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ){
        //이거 어떻게 추가 로직을 만들지..?

        return ResponseEntity.ok(new OnlyMessageResDto("업적 달성으로 뱃지가 추가되었습니다."));
    }

    //사용자의 뱃지 리스트 추가 기능 구현을 위해서는 Fish 기능이 완료되어야 한다.

    //각 사용자의 뱃지 리스트
    @GetMapping
    public ResponseEntity<List<allBadgesByUserResDto>> findAllBadgesByUser(
            @AuthenticationPrincipal CustomUserDetails customUserDetails){
        return ResponseEntity.ok(userBadgeService.getAllBadgesByUser(customUserDetails));
    }
}