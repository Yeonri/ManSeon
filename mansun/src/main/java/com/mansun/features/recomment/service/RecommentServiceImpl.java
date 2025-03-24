package com.mansun.features.recomment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecommentServiceImpl implements RecommentService{
    private final RecommentServiceImpl repository;

}
