package com.mansun.features.fish.repository;

import com.mansun.entity.fish.FishType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FishTypeRepository extends CrudRepository<FishType, Long> {
}
