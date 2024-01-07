package com.example.fullstack.controller.member;


import com.example.fullstack.dto.member.MemberDTO;
import com.example.fullstack.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/api/register")
    public ResponseEntity<?> memberSave(@RequestBody MemberDTO memberDTO) {
        memberService.memberSave(memberDTO);
        return ResponseEntity.ok("회원 가입 성공!");
    }
}

