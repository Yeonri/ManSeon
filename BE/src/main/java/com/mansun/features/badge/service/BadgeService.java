package com.mansun.features.badge.service;

import com.mansun.requestDto.badge.CreateBadgeReqDto;
import com.mansun.requestDto.badge.updateBadgeReqDto;
import com.mansun.responseDto.badges.allBadgeListResDto;

import java.util.List;

public interface BadgeService {
//    전체 뱃지를 추가
    void createBadge(CreateBadgeReqDto badgeParam);
//    모든 뱃지를 반환
    List<allBadgeListResDto> allBadgeList();
//    뱃지 업데이트(not Used)
    void updateBadge(updateBadgeReqDto badgeParam);
//    뱃지 삭제
    void deleteBadge(Long badgeId);
}
