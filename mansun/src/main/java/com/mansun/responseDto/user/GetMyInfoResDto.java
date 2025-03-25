package com.mansun.responseDto.user;

import com.mansun.entity.badge.UserBadge;
import com.mansun.entity.board.Board;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class GetMyInfoResDto {
    String email;
    String name;
    String nickname;
    List<UserBadge> myBadgeList;
    List<Board> myBoardList;
}