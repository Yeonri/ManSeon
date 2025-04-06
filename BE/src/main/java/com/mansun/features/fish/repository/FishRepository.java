package com.mansun.features.fish.repository;

import com.mansun.entity.fish.Fish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FishRepository extends JpaRepository<Fish,Long> {
//    UserId와 FishId를 통해 지워지지 않은 포획 물고기 단 건을 조회한다.
    List<Fish> findByUser_UserId(Long userId);
    Fish findByUser_UserIdAndFishIdAndDeletedFalse(Long userId, Long fishId);
//    UserId를 이용해 사용자의 지워지지 않은 물고기 리스트를 조회한다.
    List<Fish> findByUser_UserIdAndDeletedFalse(Long userId);
//    userId를 이용해 사용자가 포획한 갯수를 불러온다
    int countAllByUser_UserId(Long userId);
//    UserId와 FishType을 이용해서 사용자가 어떤 어종을 얼마나 잡았는지 리스트로 불러온다.
    List<Fish> findByUser_UserIdAndFishType_FishType(Long userId, Long fishType);
}
