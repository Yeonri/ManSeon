package com.mansun.features.badge.service;

import com.mansun.entity.badge.Badges;
import com.mansun.requestDto.badge.CreateBadgeReqDto;
import com.mansun.requestDto.badge.updateBadgeReqDto;
import com.mansun.responseDto.badges.allBadgeListResDto;

import java.util.List;

public interface BadgeService {
  void createBadge(CreateBadgeReqDto badgeParam);

  List<allBadgeListResDto>  allBadgeList();

  void updateBadge(updateBadgeReqDto badgeParam);

void deleteBadge();
}
