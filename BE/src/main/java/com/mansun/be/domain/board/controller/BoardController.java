package com.mansun.be.domain.board.controller;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.domain.board.dto.request.CreateBoardRequest;
import com.mansun.be.domain.board.dto.request.UpdateBoardRequest;
import com.mansun.be.domain.board.dto.response.BoardResponse;
import com.mansun.be.domain.board.service.BoardService;
import com.mansun.be.domain.follow.repository.FollowingRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final FollowingRepository followingRepository;
    private final Logger log;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Void>> createBoard(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestPart("data") @Valid CreateBoardRequest dto,
            @RequestPart(value = "image", required = false) MultipartFile image,
            HttpServletRequest request) {

        log.info("컨트롤러에 도착했어");

        return boardService.createBoard(dto, image, userDetails, request);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<BoardResponse>>> getMyBoards(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            HttpServletRequest request) {
        return boardService.getBoardsByUser(userDetails.getUserId(), request);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<ApiResponse<BoardResponse>> getOneBoard(@PathVariable Long boardId,
                                                                  HttpServletRequest request) {
        return boardService.getOneBoard(boardId, request);
    }

    @PatchMapping(value = "/{boardId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Void>> updateBoard(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                         @PathVariable Long boardId,
                                                         @RequestPart("data") UpdateBoardRequest dto,
                                                         @RequestPart(value = "image", required = false) MultipartFile image,
                                                         HttpServletRequest request) {

        return boardService.updateBoard(userDetails, boardId, dto, image, request);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<ApiResponse<Void>> deleteBoard(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                         @PathVariable Long boardId,
                                                         HttpServletRequest request) {
        return boardService.deleteBoard(userDetails, boardId, request);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BoardResponse>>> getAllBoards(HttpServletRequest request) {
        return boardService.getAllBoards(request);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<BoardResponse>>> getBoardsByUser(@PathVariable Long userId,
                                                                            HttpServletRequest request) {
        return boardService.getBoardsByUser(userId, request);
    }

    @GetMapping("/followings/latest")
    public ResponseEntity<ApiResponse<List<BoardResponse>>> getLatestFromFollowings(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            HttpServletRequest request) {
        List<Long> followingIds = followingRepository.findAllByUser_UserId(userDetails.getUserId())
                .stream().map(f -> f.getFollowingUser().getUserId()).toList();
        return boardService.getLatestFromFollowings(followingIds, request);
    }

    // 최신 보드 10개
    @GetMapping("/latest")
    public ResponseEntity<ApiResponse<List<BoardResponse>>> getLatestBoards(
            HttpServletRequest request) {
        return boardService.getLatestBoards(request);
    }

}
