package com.mansun.be.domain.board.entity;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.domain.board.dto.request.CreateBoardRequest;
import com.mansun.be.domain.comment.entity.Comment;
import com.mansun.be.domain.like.entity.Like;
import com.mansun.be.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = @Index(name = "isDelete",columnList = "deleted"))
public class Board {

    // =================== 기본 필드 =================== //
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private String postImg;

    @OneToMany(mappedBy = "board")
    private List<Like> likeList;

    private int likeCount;

    @OneToMany(mappedBy = "board")
    private List<Comment> commentList;

    private int commentCount;

    @Builder.Default
    private boolean deleted=false;

    // ===================== 정적 생성 메서드 =====================
    public static Board create(CreateBoardRequest request, User user) {
        return Board.builder()
                .user(user)
                .title(request.getTitle())
                .content(request.getContent())
                .postImg(request.getPostImg())
                .likeCount(0)
                .commentCount(0)
                .deleted(false)
                .createdAt(LocalDateTime.now())
                .build();
    }

    // ===================== 도메인 행동 메서드 =====================
    public void update(String title, String content, String postImg) {
        if (title != null) this.title = title;
        if (content != null) this.content = content;
        if (postImg != null) this.postImg = postImg;
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
