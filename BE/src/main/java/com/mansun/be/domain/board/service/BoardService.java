package com.mansun.be.domain.board.service;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.common.response.ApiResponseUtil;
import com.mansun.be.domain.board.dto.request.CreateBoardRequest;
import com.mansun.be.domain.board.dto.request.UpdateBoardRequest;
import com.mansun.be.domain.board.dto.response.BoardResponse;
import com.mansun.be.domain.board.entity.Board;
import com.mansun.be.domain.board.exception.UnauthorizedException;
import com.mansun.be.domain.board.repository.BoardRepository;
import com.mansun.be.domain.user.entity.User;
import com.mansun.be.domain.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    // #1. 게시글 생성
    public ResponseEntity<ApiResponse<Void>> createBoard(
            CreateBoardRequest dto,
            CustomUserDetails userDetails,
            HttpServletRequest request) {

        User user = userRepository.findByUserIdAndDeletedFalse(userDetails.getUserId())
                .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다."));

        Board board = Board.create(dto, user);
        boardRepository.save(board);
        return ApiResponseUtil.success(null, "게시글 등록 성공", HttpStatus.CREATED, request.getRequestURI());
    }

    // #2. 게시글 조회
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<BoardResponse>> getOneBoard(Long boardId, HttpServletRequest request) {
        Board board = boardRepository.findByBoardIdAndDeletedFalse(boardId)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 게시글입니다."));

        BoardResponse response = BoardResponse.builder().title(board.getTitle())
                .content(board.getContent())
                .postImg(board.getPostImg())
                .build();

        return ApiResponseUtil.success(response, "게시글 조회 성공", HttpStatus.OK, request.getRequestURI());
    }

    // #3. 게시글 수정
    @Transactional
    public ResponseEntity<ApiResponse<Void>> updateBoard(
            CustomUserDetails userDetails, Long boardId, UpdateBoardRequest dto, HttpServletRequest request) {

        Board board = boardRepository.findByBoardIdAndDeletedFalse(boardId)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));

        if (!board.getUser().getUserId().equals(userDetails.getUserId())) {
            throw new UnauthorizedException("수정 권한이 없습니다.");
        }

        board.update(dto.getTitle(), dto.getContent(), dto.getPostImg());

        return ApiResponseUtil.success(null, "게시글 수정 성공", HttpStatus.OK, request.getRequestURI());
    }

    // #4. 게시글 삭제
    @Transactional
    public ResponseEntity<ApiResponse<Void>> deleteBoard(
            CustomUserDetails userDetails, Long boardId, HttpServletRequest request) {

        Board board = boardRepository.findByBoardIdAndDeletedFalse(boardId)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));

        if (!board.getUser().getUserId().equals(userDetails.getUserId())) {
            throw new UnauthorizedException("삭제 권한이 없습니다.");
        }

        board.softDelete();

        return ApiResponseUtil.success(null, "게시글 삭제 성공", HttpStatus.OK, request.getRequestURI());
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<List<BoardResponse>>> getAllBoards(HttpServletRequest request) {

        List<Board> boards = boardRepository.findAllByDeletedFalseOrderByCreatedAtDesc();

        List<BoardResponse> responseList = boards.stream()
                .map(BoardResponse::from)
                .toList();

        return ApiResponseUtil.success(responseList, "게시글 전체 조회 성공", HttpStatus.OK, request.getRequestURI());
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<List<BoardResponse>>> getBoardsByUser(Long userId, HttpServletRequest request) {
        List<Board> boards = boardRepository.findAllByUser_UserIdAndDeletedFalseOrderByCreatedAtDesc(userId);

        List<BoardResponse> responseList = boards.stream()
                .map(BoardResponse::from)
                .toList();

        return ApiResponseUtil.success(responseList, "해당 유저의 게시글 조회 성공", HttpStatus.OK, request.getRequestURI());
    }


}
