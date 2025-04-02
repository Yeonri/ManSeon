package com.mansun.entity.follow;

import com.mansun.entity.Users;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Follower {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Users user;
    private Long followerUserId;

    private boolean isDelete;
}