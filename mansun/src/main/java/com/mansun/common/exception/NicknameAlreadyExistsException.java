package com.mansun.common.exception;
public class NicknameAlreadyExistsException extends RuntimeException {
    public NicknameAlreadyExistsException(String message) {
        super(message);
    }
}