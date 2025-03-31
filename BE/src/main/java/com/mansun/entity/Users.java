package com.mansun.entity;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.badge.Badges;
import com.mansun.entity.badge.UserBadge;
import com.mansun.entity.board.Board;
import com.mansun.entity.board.Comment;
import com.mansun.entity.board.Recomment;
import com.mansun.entity.fish.Fish;
import com.mansun.entity.follow.Follower;
import com.mansun.entity.follow.Following;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Schema(title = "유저 정보", description = "각 유저 정보로 활용되어야 할 Id,Email,name등의 정보가 담겨 있다")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    public Users(CustomUserDetails customUserDetails){
        this.setEmail(customUserDetails.getUsername());
        this.setUserId(customUserDetails.getUserId());
    }
    //    연관 관계
    @OneToMany(mappedBy = "user")
    private List<Board> board;

    @OneToMany(mappedBy = "user")
    private List<UserBadge> Badges;

    @OneToMany(mappedBy = "user")
    private List<Fish> fishes;

    @OneToMany(mappedBy = "user")
    private List<Follower> follower;

    @OneToMany(mappedBy = "user")
    private List<Following> following;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;

    @OneToMany(mappedBy = "user")
    private List<Recomment> recomments;

    //    Column
    @Schema(description = "유저의 이메일")
    @Column(unique = true)
    private String email;

    @Schema(description = "유저의 비밀번호")
    private String password;

    @Schema(description = "유저의 닉네임")
    private String nickname;

    @Schema(description = "유저의 실명")
    private String username;

    @Schema(description = "유저의 전화번호")
    private String phoneNum;

    @Schema(description = "유저의 프로필 사진")
    @Builder.Default
    private String profileImg="";

    @Builder.Default
    private int followingNum = 0;

    @Builder.Default
    private int followerNum = 0;
}
