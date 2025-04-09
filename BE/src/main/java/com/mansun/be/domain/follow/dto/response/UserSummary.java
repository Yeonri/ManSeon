package com.mansun.be.domain.follow.dto.response;

import com.mansun.be.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserSummary {
    private Long userId;
    private String nickname;
    private String profileImg;

    public static UserSummary from(User user) {
        return UserSummary.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .profileImg(user.getProfileImg())
                .build();
    }
}
