package com.mansun.features.inquiry.service;

import com.mansun.common.auth.CustomUserDetails;
import com.mansun.entity.Inquiry;
import com.mansun.entity.Users;
import com.mansun.features.inquiry.repository.InquiryRepository;
import com.mansun.requestDto.inquiry.AddInquiryReqDto;
import com.mansun.responseDto.inquiry.DeleteInquiryReqDto;
import com.mansun.responseDto.inquiry.InquiryResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class InquiryServiceImpl {
    private final InquiryRepository inquiryRepository;

    public void addInquiry(CustomUserDetails customUserDetails, AddInquiryReqDto req){
        inquiryRepository.save(Inquiry.builder()
                        .user(new Users(customUserDetails))
                        .content(req.getContent())
                .build());
    }

    public List<InquiryResDto> getInquiries(CustomUserDetails customUserDetails){
        return inquiryRepository.findAll().stream()
                .map(
                        inquiry -> InquiryResDto.builder()
                                .user(inquiry.getUser().getUserId())
                                .Content(inquiry.getContent())
                                .build()
                )
                .collect(Collectors.toList());
    }

    public void deleteInquiries(DeleteInquiryReqDto req){
        inquiryRepository.deleteById(req.getId());
    }
}
