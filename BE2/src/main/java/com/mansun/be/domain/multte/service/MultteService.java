package com.mansun.be.domain.multte.service;

import com.mansun.be.domain.multte.dto.response.MultteResultResponse;
import com.mansun.be.domain.multte.entity.MultteResult;
import com.mansun.be.domain.multte.repository.MultteResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MultteService {

    private final MultteResultRepository multteResultRepository;

    public List<MultteResultResponse> getTop5ElboAt(LocalDateTime datetime) {
        List<MultteResult> results = multteResultRepository.findTop5ByDatetimeOrderByElboScoreDesc(datetime);

        if (results.isEmpty()) {
            throw new NoSuchElementException("해당 시각에 대한 데이터가 없습니다.");
        }

        return results.stream()
                .map(MultteResultResponse::from)
                .toList();
    }
}
