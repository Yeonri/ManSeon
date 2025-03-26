package com.mansun.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter // 이거 지우면 오류난다. 절대 금지
@AllArgsConstructor
public class OnlyMessageResDto {
	String message;
}
