package com.mansun.be.domain.board.entity;

import com.mansun.be.domain.board.dto.request.CreateBoardRequest;
import com.mansun.be.domain.comment.entity.Comment;
import com.mansun.be.domain.like.entity.Like;
import com.mansun.be.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Table(name = "board", indexes = {@Index(name = "idx_board_deleted", columnList = "deleted")})
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "post_img")
    private String postImg;

    @Column(name = "thumb_img")
    private String thumbImg;

    @OneToMany(mappedBy = "board")
    private List<Like> likeList = new ArrayList<>();

    @Column(name = "like_count")
    private int likeCount;

    @OneToMany(mappedBy = "board")
    private List<Comment> commentList = new ArrayList<>();

    @Column(name = "comment_count")
    private int commentCount;

    @Builder.Default
    @Column(nullable = false)
    private boolean deleted = false;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public static Board create(CreateBoardRequest request, User user, String postImgUrl, String thumbImgUrl) {
        return Board.builder()
                .user(user)
                .title(request.getTitle())
                .content(request.getContent())
                .postImg(postImgUrl)
                .thumbImg(thumbImgUrl)
                .likeCount(0)
                .commentCount(0)
                .deleted(false)
                .build();
    }

    public void update(String title, String content, String postImgUrl, String thumbImgUrl) {
        if (title != null) this.title = title;
        if (content != null) this.content = content;
        if (postImgUrl != null) this.postImg = postImgUrl;
        if (thumbImgUrl != null) this.thumbImg = thumbImgUrl;
    }

    public void softDelete() {
        this.deleted = true;
    }

    public void increaseLike() {
        this.likeCount++;
    }

    public void decreaseLike() {
        this.likeCount = Math.max(0, this.likeCount - 1);
    }

    public void increaseComment() {
        this.commentCount++;
    }

    public void decreaseComment() {
        this.commentCount = Math.max(0, this.commentCount - 1);
    }
}