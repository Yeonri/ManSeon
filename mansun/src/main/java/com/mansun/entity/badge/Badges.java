package com.mansun.entity.badge;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

import javax.annotation.processing.Generated;
@Entity
@Getter
public class Badges {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long badgeId;

//    Column
    private String badgeName;
    private String badgeImg;
}
