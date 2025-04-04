package com.mansun.features.badge.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.responseDto.badges.allBadgesByUserResDto;

import java.util.List;

public interface UserBadgeService {
//    하나의 사용자가 소유하고 있는 전체의 뱃지 리스트
    List<allBadgesByUserResDto> getAllBadgesByUser(CustomUserDetails customUserDetails);
}
