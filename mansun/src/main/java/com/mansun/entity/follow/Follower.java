package com.mansun.entity.follow;

import com.mansun.entity.Users;
import jakarta.persistence.*;

public class Follower {
    @Id
    @GeneratedValue
    private Long pk;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Users user;
    private Long followerUserId;
}