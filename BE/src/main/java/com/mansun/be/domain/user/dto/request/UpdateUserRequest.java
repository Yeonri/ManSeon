package com.mansun.be.domain.user.dto.request;

import lombok.Data;

@Data
public class UpdateUserRequest {

    private String nickname;
    private String phoneNum;
    private String password;

}
