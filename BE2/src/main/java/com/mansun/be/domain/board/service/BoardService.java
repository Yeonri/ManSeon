package com.mansun.be.domain.board.service;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.imageUtil.ImageSaveManager;
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
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private static final Logger log = LoggerFactory.getLogger(BoardService.class);


    @Transactional
    public ResponseEntity<ApiResponse<Void>> createBoard(
            CreateBoardRequest dto,
            MultipartFile image,
            CustomUserDetails userDetails,
            HttpServletRequest request) {

        try {
            User user = userRepository.findByUserIdAndDeletedFalse(userDetails.getUserId())
                    .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다."));

            // 1. 게시글 저장
            Board board = Board.builder()
                    .user(user)
                    .title(dto.getTitle())
                    .content(dto.getContent())
                    .likeCount(0)
                    .commentCount(0)
                    .deleted(false)
                    .build();

            boardRepository.save(board);

            // 2. 이미지 저장
            ImageSaveManager.processAndSaveImage(2, board.getBoardId(), image);

            // 3. URL 생성
            String postImgUrl = "/resized/" + board.getBoardId() + ".jpg";
            String thumbImgUrl = "/thumb/" + board.getBoardId() + ".jpg";

            // 4. URL 정보 저장
            board.update(dto.getTitle(), dto.getContent(), postImgUrl, thumbImgUrl);

            return ApiResponseUtil.success(null, "게시글 등록 성공", HttpStatus.CREATED, request.getRequestURI());

        } catch (Exception e) {
            log.error("[게시글 생성 실패] userId: {}, error: {}", userDetails.getUserId(), e.getMessage());
            log.error("Exception stack trace: ", e);
            return ApiResponseUtil.failure("게시글 등록 실패", HttpStatus.INTERNAL_SERVER_ERROR, request.getRequestURI());
        }
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<BoardResponse>> getOneBoard(Long boardId, HttpServletRequest request) {
        Board board = boardRepository.findByBoardIdAndDeletedFalse(boardId)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 게시글입니다."));

        return ApiResponseUtil.success(BoardResponse.from(board), "게시글 조회 성공", HttpStatus.OK, request.getRequestURI());
    }


    @Transactional
    public ResponseEntity<ApiResponse<Void>> updateBoard(CustomUserDetails userDetails,
                                                         Long boardId,
                                                         UpdateBoardRequest dto,
                                                         MultipartFile image,
                                                         HttpServletRequest request) {
        Board board = boardRepository.findByBoardIdAndDeletedFalse(boardId)
                .orElseThrow(() -> new NoSuchElementException("게시글이 존재하지 않습니다."));

        if (!board.getUser().getUserId().equals(userDetails.getUserId())) {
            throw new UnauthorizedException("수정 권한이 없습니다.");
        }

        String postImgUrl = board.getPostImg();      // 기존 이미지 유지
        String thumbImgUrl = board.getThumbImg();    // 기존 썸네일 유지

        if (image != null && !image.isEmpty()) {

            // 1. 이미지 저장
            ImageSaveManager.processAndSaveImage(2, board.getBoardId(), image);

            // 2. URL 갱신
            postImgUrl = "/resized/" + board.getBoardId() + ".jpg";
            thumbImgUrl = "/thumb/" + board.getBoardId() + ".jpg";
        }

        board.update(dto.getTitle(), dto.getContent(), postImgUrl, thumbImgUrl);

        return ApiResponseUtil.success(null, "게시글 수정 성공", HttpStatus.OK, request.getRequestURI());
    }


    public ResponseEntity<ApiResponse<Void>> deleteBoard(CustomUserDetails userDetails, Long boardId, HttpServletRequest request) {
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
        List<BoardResponse> responses = boards.stream().map(BoardResponse::from).toList();
        return ApiResponseUtil.success(responses, "전체 게시글 조회 성공", HttpStatus.OK, request.getRequestURI());
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<List<BoardResponse>>> getBoardsByUser(Long userId, HttpServletRequest request) {
        List<Board> boards = boardRepository.findAllByUser_UserIdAndDeletedFalseOrderByCreatedAtDesc(userId);
        List<BoardResponse> responses = boards.stream().map(BoardResponse::from).toList();
        return ApiResponseUtil.success(responses, "사용자 게시글 조회 성공", HttpStatus.OK, request.getRequestURI());
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<List<BoardResponse>>> getLatestFromFollowings(List<Long> followingIds, HttpServletRequest request) {
        List<Board> boards = boardRepository.findTop10ByUser_UserIdInAndDeletedFalseOrderByCreatedAtDesc(followingIds);
        List<BoardResponse> responses = boards.stream().map(BoardResponse::from).toList();
        return ApiResponseUtil.success(responses, "팔로잉의 최신 게시글 조회 성공", HttpStatus.OK, request.getRequestURI());
    }

    public ResponseEntity<ApiResponse<List<BoardResponse>>> getLatestBoards(HttpServletRequest request) {
        List<BoardResponse> boards = boardRepository.findTop10ByDeletedFalseOrderByCreatedAtDesc()
                .stream()
                .map(BoardResponse::from)
                .collect(Collectors.toList());

        return ApiResponseUtil.success(boards, "최신 게시글 10개 조회 성공", HttpStatus.OK, request.getRequestURI());
    }
}