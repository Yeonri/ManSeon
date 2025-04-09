package com.mansun.be.domain.follow.entity;

import com.mansun.be.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Follower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="follower_user_id", nullable = false)
    private User follower;

    // =================== 정적 생성자 =================== //
    public static Follower create(User me, User follower) {
        return Follower.builder()
                .user(me)
                .follower(follower)
                .build();
    }
}
