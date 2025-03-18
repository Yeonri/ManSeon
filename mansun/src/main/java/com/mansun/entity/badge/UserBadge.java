package com.mansun.entity.badge;

import com.mansun.entity.Users;
import com.mansun.entity.badge.Badges;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class UserBadge {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
//    연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Badges badge;
}
