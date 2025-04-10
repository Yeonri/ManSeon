package com.mansun.responseDto.inquiry;

import com.mansun.entity.Users;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter

public class InquiryResDto {
    Long user;
    String Content;
}
