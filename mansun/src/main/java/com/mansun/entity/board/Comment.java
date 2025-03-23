package com.mansun.entity.board;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.Users;
import com.mansun.requestDto.comment.CreateCommentReqDto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(title = "각 게시물의 댓글 정보",description = "각 댓글 정보, 생성일, 대댓글 수")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    public Comment(CustomUserDetails customUserDetails, CreateCommentReqDto reqDto){
        this.setUser(new Users(customUserDetails));
        this.setCreatedAt(LocalDateTime.now());
        this.setCommentContent(reqDto.getContent());

    }
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
