package com.mansun.features.badge.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.badge.Badges;
import com.mansun.features.badge.repository.BadgeRepository;
import com.mansun.features.badge.repository.UserBadgeRepository;
import com.mansun.requestDto.badge.CreateBadgeReqDto;
import com.mansun.requestDto.badge.updateBadgeReqDto;
import com.mansun.responseDto.badges.allBadgeListResDto;
import com.mansun.responseDto.badges.allBadgesByUserResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService {
    private final BadgeRepository badgeRepository;

    @Override
    public void createBadge(CreateBadgeReqDto badgeParam) {
        Badges saveBadge= badgeRepository.save(
                Badges
                        .builder()
                        .badgeName(badgeParam.getBadgeName())
                        .badgeImg(badgeParam.getBadgeImg())
                        .build());

    }

    @Override
    public List<allBadgeListResDto> allBadgeList() {
        return badgeRepository.findAll().stream()
                .map(b ->
                        allBadgeListResDto.builder()
                        .badgeName(b.getBadgeName())
                        .badgeImg(b.getBadgeImg())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public void updateBadge(updateBadgeReqDto badgeParam) {

    }

    @Override
    public void deleteBadge() {

    }
}
