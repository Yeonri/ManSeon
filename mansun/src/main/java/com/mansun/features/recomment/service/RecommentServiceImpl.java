package com.mansun.features.recomment.service;

import com.mansun.entity.board.Recomment;
import com.mansun.features.recomment.repository.RecommentRepository;
import com.mansun.requestDto.recomment.CreateRecommentReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecommentServiceImpl implements RecommentService{
    private final RecommentRepository repository;

    public void createRecomment(CreateRecommentReqDto req) {
        repository.save(Recomment.builder()
                .build());
    }

    public void updateRecomment(){


    }
    public void deleteRecomment(){

    }
}
