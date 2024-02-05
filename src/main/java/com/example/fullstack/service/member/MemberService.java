package com.example.fullstack.service.member;


import com.example.fullstack.dto.member.MemberDTO;
import com.example.fullstack.security.jwt.user.JwtUserToken;
import org.springframework.stereotype.Service;



@Service
public interface MemberService {
    void memberSingUp(MemberDTO memberDTO);
    JwtUserToken memberLogin(MemberDTO memberDTO);
}