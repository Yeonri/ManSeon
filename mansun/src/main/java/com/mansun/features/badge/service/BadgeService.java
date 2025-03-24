package com.mansun.features.badge.service;

import com.mansun.entity.badge.Badges;
import com.mansun.requestDto.badge.CreateBadgeReqDto;
import com.mansun.requestDto.badge.updateBadgeReqDto;
import com.mansun.responseDto.badges.allBadgeListResDto;

import java.util.List;

public interface BadgeService {
    public void createBadge(CreateBadgeReqDto badgeParam);

    public List<allBadgeListResDto>  allBadgeList();

    public void updateBadge(updateBadgeReqDto badgeParam);

    public void deleteBadge();
}
