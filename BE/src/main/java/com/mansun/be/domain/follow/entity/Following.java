package com.mansun.be.domain.follow.entity;

import com.mansun.be.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Following {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_user_id", nullable = false)
    private User followingUser;


    // =================== 정적 생성자 =================== //
    public static Following create(User me, User targetUser) {
        return com.mansun.be.domain.follow.entity.Following.builder()
                .user(me)
                .followingUser(targetUser)
                .build();
    }
}
