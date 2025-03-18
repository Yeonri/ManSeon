package com.mansun.entity.board;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Recomment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recommentId;
//  연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Comment comment;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn
    private Board board;

//  Column
    private String recommentContent;
    private LocalDateTime createdAt;
}
