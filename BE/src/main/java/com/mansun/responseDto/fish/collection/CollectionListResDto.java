package com.mansun.responseDto.fish.collection;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class CollectionListResDto {
    Long id;
    String name;
    String description;
    String image;
    Boolean is_collected;
    List<Collection> collection_info;
    public CollectionListResDto(Long id, String name, String description, String image, Boolean is_collected, List<Collection> collection_info) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.is_collected = is_collected;
        this.collection_info = collection_info;
    }


}
