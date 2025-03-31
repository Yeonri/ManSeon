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
@NoArgsConstructor
@AllArgsConstructor
public class GetMyInfoResDto {
    String email;
    String username;
    String nickname;
    List<UserBadge> myBadgeList;
    List<Board> myBoardList;
}