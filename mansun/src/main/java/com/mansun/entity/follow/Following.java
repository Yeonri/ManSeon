package com.mansun.entity.follow;

import com.mansun.entity.Users;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
public class Following {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Users user;

    private Long followingUserId;
}
