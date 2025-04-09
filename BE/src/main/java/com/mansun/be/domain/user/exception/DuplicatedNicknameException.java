package com.mansun.be.domain.user.exception;

public class DuplicatedNicknameException extends RuntimeException{
    public DuplicatedNicknameException(String message) {
        super(message);
    }
}
