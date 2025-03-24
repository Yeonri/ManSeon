package com.mansun.features.fish.repository;

import com.mansun.entity.fish.Fish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FishRepository extends JpaRepository<Fish,Long> {
}
