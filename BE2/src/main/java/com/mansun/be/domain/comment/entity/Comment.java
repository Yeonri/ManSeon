package com.mansun.be.domain.comment.entity;

import com.mansun.be.domain.board.entity.Board;
import com.mansun.be.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> replies = new ArrayList<>();

    private String content;

    private boolean deleted = false;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public static Comment create(Board board, User user, String content, Comment parent) {
        Comment comment = new Comment();
        comment.board = board;
        comment.user = user;
        comment.content = content;
        comment.parent = parent;
        comment.createdAt = LocalDateTime.now();
        comment.updatedAt = LocalDateTime.now();
        return comment;
    }

    public void update(String content) {
        this.content = content;
        this.updatedAt = LocalDateTime.now();
    }

    public void softDelete() {
        this.deleted = true;
    }
}
