package com.mansun.entity.board;

import com.mansun.entity.Users;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(title = "각 게시물의 댓글 정보",description = "각 댓글 정보, 생성일, 대댓글 수")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
//    연관 관계
    @ManyToOne
    @JoinColumn
    private Users user;

//    Column
    @Schema(description = "댓글 내용")
    private String commentContent;
    @Schema(description = "생성일")
    private LocalDateTime createdAt;
    @Schema(description = "대댓글 수")
    private int recommentNum;

}
