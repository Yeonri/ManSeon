package com.mansun.features.badge.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.responseDto.badges.allBadgesByUserResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface UserBadgeService {
    //    하나의 사용자가 소유하고 있는 전체의 뱃지 리스트
    List<allBadgesByUserResDto> getAllBadgesByUser(CustomUserDetails customUserDetails);
}
