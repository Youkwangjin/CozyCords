package com.example.fullstack.service.member;

import com.example.fullstack.dto.member.MemberDTO;
import com.example.fullstack.security.jwt.JwtToken;
import org.springframework.stereotype.Service;


@Service
public interface MemberUpdateService {
    MemberDTO getUserInfoByNo(Long userNo);
    JwtToken updateUser(MemberDTO memberDTO);
    JwtToken refreshAccessToken(String refreshToken);
}
