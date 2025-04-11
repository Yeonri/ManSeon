package com.mansun.features.inquiry;


import com.mansun.common.auth.CustomUserDetails;
import com.mansun.features.inquiry.service.InquiryServiceImpl;
import com.mansun.requestDto.inquiry.AddInquiryReqDto;
import com.mansun.responseDto.inquiry.DeleteInquiryReqDto;
import com.mansun.responseDto.MessageResDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inquiry")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "InquiryController", description = "문의사항 CRD를 담당하는 컨트롤러")
public class InquiryController {
    private final InquiryServiceImpl inquiryService;

    @PostMapping
    public ResponseEntity<MessageResDto> addInquiry(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @Valid @RequestBody AddInquiryReqDto req
    ) {
        inquiryService.addInquiry(customUserDetails, req);
        return ResponseEntity.ok(new MessageResDto("문의 사항이 접수되었습니다."));
    }

    @GetMapping
    public ResponseEntity<MessageResDto> getInquiry(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        inquiryService.getInquiries(customUserDetails);
        return ResponseEntity.ok(new MessageResDto("문의 사항이 접수되었습니다."));
    }

    @DeleteMapping
    public void deleteInquiry(
            @Valid @RequestBody DeleteInquiryReqDto req
            ){
        inquiryService.deleteInquiries(req);
    }
}
