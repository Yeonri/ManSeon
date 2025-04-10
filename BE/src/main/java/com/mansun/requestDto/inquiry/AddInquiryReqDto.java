package com.mansun.requestDto.inquiry;

import com.mansun.entity.Users;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AddInquiryReqDto {
    private String content;
}
