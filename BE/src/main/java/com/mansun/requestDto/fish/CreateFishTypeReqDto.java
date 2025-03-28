package com.mansun.requestDto.fish;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class CreateFishTypeReqDto {
    @JsonProperty("fishName")
    String fishName;
    @JsonProperty("fishPlace")
    String fishPlace;
    @JsonProperty("characteristic")
    String characteristic;
}
