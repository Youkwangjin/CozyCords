package com.example.fullstack.service.member;

import com.example.fullstack.dto.member.MemberDTO;
import com.example.fullstack.security.jwt.user.JwtUserToken;
import org.springframework.stereotype.Service;


@Service
public interface MemberUpdateService {
    MemberDTO getUserInfo(String userId);
    JwtUserToken updateUser(MemberDTO memberDTO);
    JwtUserToken refreshAccessToken(String refreshToken);
}
