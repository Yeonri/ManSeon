package com.mansun.features.badge.service;

import com.mansun.common.utils.NullAwareBeanUtils;
import com.mansun.entity.badge.Badges;
import com.mansun.features.badge.repository.BadgeRepository;
import com.mansun.requestDto.badge.CreateBadgeReqDto;
import com.mansun.requestDto.badge.updateBadgeReqDto;
import com.mansun.responseDto.badges.allBadgeListResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService {
    private final BadgeRepository badgeRepository;

    //신규 뱃지를 생성하는 로직
    @Override
    public void createBadge(CreateBadgeReqDto badgeParam) {
        badgeRepository.save(
                Badges
                        .builder()
                        .badgeName(badgeParam.getBadgeName())
                        .badgeImg(badgeParam.getBadgeImg())
                        .build());

    }

    //전체 뱃지 리스트를 호출하는 로직
    @Override
    public List<allBadgeListResDto> allBadgeList() {
        return badgeRepository.findAll().stream()
                .map(b ->
                        allBadgeListResDto.builder()
                                .badgeId(b.getBadgeId())
                                .badgeName(b.getBadgeName())
                                .badgeImg(b.getBadgeImg())
                                .build())
                .collect(Collectors.toList());
    }

    //전체 뱃지 중 단일 뱃지를 업데이트 하는 로직<not used>
    @Override
    public void updateBadge(updateBadgeReqDto req) {
        Badges badge =
                badgeRepository.findById(req.getBadgeId()).orElseThrow();
        BeanUtils.copyProperties(req, badge, NullAwareBeanUtils.getNullPropertyNames(req));
    }

    //전체 뱃지 중 단일 뱃지를 삭제하는 로직(soft Delete)
    @Override
    public void deleteBadge(Long badgeId) {
        Badges badge = badgeRepository.findById(badgeId).orElseThrow();
        badge.setDeleted(true);
    }
}
