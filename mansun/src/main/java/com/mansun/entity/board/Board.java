package com.mansun.entity.board;

import com.mansun.entity.Users;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(title = "전체 게시판",description = "전체 게시판의 정보를 담은 Entity")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "게시물 아이디", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long postId;

    //연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Users user;

    //Column
    @Schema(description = "게시물 제목")
    private String title;
    @Schema(description = "게시물 내용")
    private String content;
    @Schema(description = "게시일")
    private LocalDateTime createdAt;
    @Schema(description = "게시물 이미지")
    private String postImg;
    @Schema(description = "각 게시물의 좋아요 수")
    private int likeNum;
    @Schema(description = "각 게시물의 댓글 수")
    private int commentNum;
}
