package com.mansun.features.badge.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.badge.Badges;
import com.mansun.features.badge.repository.UserBadgeRepository;
import com.mansun.responseDto.badges.allBadgesByUserResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserBadgeServicempl implements UserBadgeService{
    private final UserBadgeRepository userBadgeRepository;

    public List<allBadgesByUserResDto> getAllBadgesByUser(CustomUserDetails customUserDetails){
        List<Badges> allBadgesByUser=userBadgeRepository.findByUser_UserId(customUserDetails.getUserId());

        return allBadgesByUser.stream()
                .map(
                b->allBadgesByUserResDto.builder()
                        .badgeName(b.getBadgeName())
                        .badgeImg(b.getBadgeImg())
                        .build()
        ).collect(Collectors.toList());
    }
}
