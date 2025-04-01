package com.mansun.responseDto.user;

import com.mansun.entity.badge.UserBadge;
import com.mansun.entity.board.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
public class GetTheOtherOneInfoResDto {
    String email;
    String nickname;
    String username;
    List<UserBadge> badgeList;
    List<Board> boardList;
}
