package com.mansun.entity.board;

import com.mansun.entity.Users;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
//    연관 관계
    @ManyToOne
    @JoinColumn
    private Users user;

//    Column
    private String commentContent;
    private LocalDateTime createdAt;
    private int recommentNum;

}
