package com.mansun.responseDto.fish.collection;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;

public class Collection {
//    String location_name;
    float latitude;
    float longitude;
    OffsetDateTime caught_at;

    public Collection(float latitude, float longitude, OffsetDateTime caught_at) {
//        this.location_name = location_name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.caught_at = caught_at;
    }
}
