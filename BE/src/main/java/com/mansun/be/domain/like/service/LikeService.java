package com.mansun.be.domain.like.service;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.common.response.ApiResponseUtil;
import com.mansun.be.domain.board.entity.Board;
import com.mansun.be.domain.board.repository.BoardRepository;
import com.mansun.be.domain.like.entity.Like;
import com.mansun.be.domain.like.repository.LikeRepository;
import com.mansun.be.domain.user.entity.User;
import com.mansun.be.domain.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public ResponseEntity<ApiResponse<Void>> toggleLike(
            Long boardId,
            CustomUserDetails userDetails,
            HttpServletRequest request) {

        User user = userRepository.findByUserIdAndDeletedFalse(userDetails.getUserId())
                .orElseThrow(() -> new NoSuchElementException("사용자 없음"));

        Board board = boardRepository.findByBoardIdAndDeletedFalse(boardId)
                .orElseThrow(() -> new NoSuchElementException("게시글 없음"));

        Optional<Like> existingLike = likeRepository.findByUserAndBoard(user, board);

        if (existingLike.isPresent()) {
            Like like = existingLike.get();
            if (like.isDeleted()) {
                like.restore();
                board.increaseLike();
                return ApiResponseUtil.success(null, "좋아요 재등록", HttpStatus.OK, request.getRequestURI());
            } else {
                like.softDelete();
                board.decreaseLike();
                return ApiResponseUtil.success(null, "좋아요 취소", HttpStatus.OK, request.getRequestURI());
            }
        }

        // 신규 좋아요 등록
        Like newLike = Like.create(user, board);
        likeRepository.save(newLike);
        board.increaseLike();
        return ApiResponseUtil.success(null, "좋아요 등록", HttpStatus.CREATED, request.getRequestURI());
    }

}
