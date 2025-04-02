package com.mansun.features.badge.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.responseDto.badges.allBadgesByUserResDto;

import java.util.List;

public interface UserBadgeService {
    List<allBadgesByUserResDto> getAllBadgesByUser(CustomUserDetails customUserDetails);
}
