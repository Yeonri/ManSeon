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
//별도로 MySQL엔 DB Index를 Board와 Comment를 복합키로 꽂아넣는다.
@Schema(title = "각 대댓글 정보", description = "각 대댓글이 담고 있는 대댓글 내용, 생성일")
public class Recomment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "각 대댓글 아이디", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long recommentId;
    //  연관 관계
    @ManyToOne
    @JoinColumn
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Comment comment;

    //  Column
    @Schema(description = "대댓글 내용")
    private String recommentContent;
    @Schema(description = "각 대댓글 생성일")
    private LocalDateTime createdAt;

    private boolean isDelete;
}