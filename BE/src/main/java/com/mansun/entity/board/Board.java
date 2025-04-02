package com.mansun.entity.board;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.Users;
import com.mansun.requestDto.board.CreateBoardReqDto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(title = "전체 게시판", description = "전체 게시판의 정보를 담은 Entity")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "게시물 아이디", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long boardId;

    //게시글 생성을 위한 생성자
    public Board(CustomUserDetails customUserDetails, CreateBoardReqDto req) {
        Users user=new Users(customUserDetails);
        this.setUser(user);
        this.setTitle(req.getTitle());
        this.setContent(req.getContent());
        this.setCreatedAt(LocalDateTime.now());
    }

    //연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Users user;

    @OneToMany(mappedBy = "board")
    private List<Comment> comment;

    //Column
    @Schema(description = "게시물 제목")
    @Column(nullable = false)
    private String title;
    @Schema(description = "게시물 내용")
    @Column(nullable = false)
    private String content;
    @Schema(description = "게시일")
    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Schema(description = "게시물 이미지")
    private String postImg;
    @Schema(description = "각 게시물의 좋아요 수")
    private int likeNum;
    @Schema(description = "각 게시물의 댓글 수")
    private int commentNum;

    private boolean isDelete;
}
