package com.mansun.responseDto.user.getmyinfo;

import com.mansun.entity.badge.UserBadge;
import com.mansun.entity.board.Board;
import com.mansun.entity.fish.Fish;
import com.mansun.entity.fishingPoint.FishingPoint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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