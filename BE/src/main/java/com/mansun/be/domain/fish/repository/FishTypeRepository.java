package com.mansun.be.domain.fish.repository;

import com.mansun.be.domain.fish.entity.FishType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FishTypeRepository extends JpaRepository<FishType, Integer> {


//    INSERT INTO fish_type (fish_type, fish_name, fish_place, character)
//    VALUES (1, '광어', '남해', '광어 상세 1'),
//       (2, '우럭', '동해', '우럭 상세 1');

}
