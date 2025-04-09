package com.mansun.be.domain.board.controller;

import com.mansun.be.common.auth.CustomUserDetails;
import com.mansun.be.common.response.ApiResponse;
import com.mansun.be.domain.board.dto.request.CreateBoardRequest;
import com.mansun.be.domain.board.dto.request.UpdateBoardRequest;
import com.mansun.be.domain.board.dto.response.BoardResponse;
import com.mansun.be.domain.board.service.BoardService;
import jakarta.persistence.EntityManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createBoard(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody CreateBoardRequest dto,
            HttpServletRequest request) {

        return boardService.createBoard(dto, userDetails, request);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<ApiResponse<BoardResponse>> getOneBoard(
            @PathVariable Long boardId,
            HttpServletRequest request) {
        return boardService.getOneBoard(boardId, request);
    }

    @PatchMapping("/{boardId}")
    public ResponseEntity<ApiResponse<Void>> updateBoard(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long boardId,
            @RequestBody UpdateBoardRequest dto,
            HttpServletRequest request) {
        return boardService.updateBoard(userDetails, boardId, dto, request);
    }
    @DeleteMapping("/{boardId}")
    public ResponseEntity<ApiResponse<Void>> deleteBoard(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long boardId,
            HttpServletRequest request) {
        return boardService.deleteBoard(userDetails, boardId, request);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BoardResponse>>> getAllBoards(HttpServletRequest request) {
        return boardService.getAllBoards(request);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<BoardResponse>>> getBoardsByUser(
            @PathVariable Long userId,
            HttpServletRequest request) {
        return boardService.getBoardsByUser(userId, request);
    }



}
