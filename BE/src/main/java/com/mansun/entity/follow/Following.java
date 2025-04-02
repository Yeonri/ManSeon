package com.mansun.entity.follow;

import com.mansun.entity.Users;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Following {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Users user;
    private Long followingUserId;

    private boolean isDelete;
}
