package com.mansun.be.domain.user.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetMyInfoResponse {
    private Long id;
    private String email;
    private String username;
    private String nickname;
    private String phone;
}

