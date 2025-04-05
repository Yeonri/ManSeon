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
@Table(indexes = @Index(name = "isDelete",columnList = "deleted"))
public class Following {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pk;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Users user;

    @OneToOne(fetch = FetchType.LAZY)
    private Users followingUser;

    @Builder.Default
    private boolean deleted=false;
}
