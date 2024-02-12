package com.example.fullstack.controller.member;


import com.example.fullstack.dto.member.MemberDTO;
import com.example.fullstack.security.jwt.JwtToken;
import com.example.fullstack.service.member.MemberUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH}, allowCredentials = "true")
public class MemberUpdateController {

    private final MemberUpdateService memberUpdateService;

    @GetMapping("/api/userInfo")
    public ResponseEntity<MemberDTO> getUserInfo(Principal principal) {
        String userId = principal.getName();
        MemberDTO memberDTO = memberUpdateService.getUserInfo(userId);
        return ResponseEntity.ok(memberDTO);
    }

    @PatchMapping("/api/user/update")
    public ResponseEntity<?> updateUser(@RequestBody MemberDTO memberDTO, Principal principal) {
        String userId = principal.getName();

        // 현재 로그인한 사용자와 수정하려는 사용자 ID가 일치하는지 검증
        if (userId == null || !userId.equals(memberDTO.getUserId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신의 정보만 수정 가능합니다.");
        }
        JwtToken newTokens = memberUpdateService.updateUser(memberDTO);
        return ResponseEntity.ok(newTokens); // 클라이언트에게 새로운 토큰 전달
    }
}