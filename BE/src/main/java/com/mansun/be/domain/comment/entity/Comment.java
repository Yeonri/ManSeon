package com.mansun.be.domain.comment.entity;

import com.mansun.be.domain.board.entity.Board;
import com.mansun.be.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent; // 부모 댓글 (없으면 null → 일반 댓글)

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Comment> children = new ArrayList<>();

    private LocalDateTime createdAt;

    @Builder.Default
    private boolean deleted = false;

    // 정적 생성자
    public static Comment create(Board board, User user, String content, Comment parent) {
        return Comment.builder()
                .board(board)
                .user(user)
                .content(content)
                .parent(parent)
                .createdAt(LocalDateTime.now())
                .deleted(false)
                .build();
    }

    public void update(String content) {
        this.content = content;
    }

    public void softDelete() {
        this.deleted = true;
    }
}
