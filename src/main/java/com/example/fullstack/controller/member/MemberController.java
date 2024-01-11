package com.example.fullstack.controller.member;


import com.example.fullstack.dto.member.MemberDTO;
import com.example.fullstack.entity.member.MemberEntity;
import com.example.fullstack.repository.member.MemberRepository;
import com.example.fullstack.security.JwtProvider;
import com.example.fullstack.security.JwtToken;
import com.example.fullstack.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;


    @PostMapping("/api/register")
    public ResponseEntity<?> memberSingUp(@RequestBody MemberDTO memberDTO) {
        memberService.memberSingUp(memberDTO);
        return ResponseEntity.ok("회원 가입 성공!");
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> memberLogin(@RequestBody MemberDTO memberDTO) {
        JwtToken jwtToken = memberService.memberLogin(memberDTO);
        return ResponseEntity.ok(jwtToken);
    }

    @PostMapping("/api/token/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestBody String refreshToken) {
        JwtToken jwtToken = memberService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(jwtToken);
    }
}
