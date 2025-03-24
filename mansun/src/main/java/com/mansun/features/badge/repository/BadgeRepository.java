package com.mansun.features.badge.repository;

import com.mansun.entity.badge.Badges;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BadgeRepository extends JpaRepository<Badges,Long> {
}
