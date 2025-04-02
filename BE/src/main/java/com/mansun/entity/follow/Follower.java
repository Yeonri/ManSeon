package com.mansun.entity.follow;

import com.mansun.entity.Users;
import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = @Index(name = "isDelete",columnList = "isDelete"))
public class Follower {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Users user;
    private Long followerUserId;
    @Builder.Default
    private boolean deleted=false;
}