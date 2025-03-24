package com.mansun.features.recomment.service;

import com.mansun.features.recomment.repository.RecommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecommentServiceImpl implements RecommentService{
    private final RecommentRepository repository;

    public void createRecomment() {

    }
}
