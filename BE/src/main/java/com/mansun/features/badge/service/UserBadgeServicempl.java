package com.mansun.features.badge.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.badge.Badges;
import com.mansun.entity.badge.UserBadge;
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

    //사용자의 아이디를 이용해 지워지지 않은 뱃지를 조회
    @Override
    public List<allBadgesByUserResDto> getAllBadgesByUser(CustomUserDetails customUserDetails){

        List<UserBadge> allBadgesByUser=userBadgeRepository.findByUser_UserIdAndDeletedFalse(customUserDetails.getUserId());

        return allBadgesByUser.stream()
                .map(
                b->allBadgesByUserResDto.builder()
                        .badgeName(b.getBadge().getBadgeName())
                        .badgeImg(b.getBadge().getBadgeImg())
                        .build()
        ).collect(Collectors.toList());
    }
}
