package com.mansun.entity;

import com.mansun.entity.badge.Badges;
import com.mansun.entity.badge.UserBadge;
import com.mansun.entity.board.Board;
import com.mansun.entity.fish.Fish;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Entity
@Getter
@Setter
public class Users {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
//    연관 관계
    @OneToMany(mappedBy = "user")
    private List<Board> board;

    @OneToMany(mappedBy = "user")
    private List<UserBadge> Badges;

    @OneToMany(mappedBy = "user")
    private List<Fish> fishes;

//    Column
    private String nickname;
    private String email;
    private String password;
    private String userName;
    private String phoneNum;
    private String profileImg;
    private int followingNum;
    private int followerNum;
}
