package com.mansun.requestDto.inquiry.user.getmyinfo;

import com.mansun.entity.badge.UserBadge;
import com.mansun.entity.fish.Fish;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class GetMyInfoResDto {
    Long id;
    String email;
    String name;
    String phone_number;
    String nickname;
    List<UserBadge> badges;
    int badges_cnt;
    int collection_cnt;
    String profile_img;
    int following_cnt;
    int follower_cnt;
    int fishing_total;
    List<Fish> fishing_list;
    List<PostResDto> posts;
}