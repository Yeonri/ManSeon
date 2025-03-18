package com.mansun.entity.board;

import com.mansun.entity.Users;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    //연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Users user;

    //Column
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String postImg;

    private int likeNum;
    private int commentNum;
}
