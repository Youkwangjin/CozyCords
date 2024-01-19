package com.example.fullstack.controller.member;


import com.example.fullstack.dto.member.MemberDTO;

import com.example.fullstack.security.exception.CustomException;
import com.example.fullstack.security.jwt.JwtToken;
import com.example.fullstack.service.member.MemberService;
import com.example.fullstack.service.member.MemberUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;
    private final MemberUpdateService memberUpdateService;

    @PostMapping("/api/register")
    public ResponseEntity<?> memberSingUp(@RequestBody MemberDTO memberDTO) {
        memberService.memberSingUp(memberDTO);
        return ResponseEntity.ok("회원 가입 성공!");
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> memberLogin(@RequestBody MemberDTO memberDTO) {
        try {
            JwtToken jwtToken = memberService.memberLogin(memberDTO);
            return ResponseEntity.ok(jwtToken);
        } catch (UsernameNotFoundException | CustomException e) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @PostMapping("/api/token/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestBody String refreshToken) {
        JwtToken jwtToken = memberUpdateService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(jwtToken);
    }
}