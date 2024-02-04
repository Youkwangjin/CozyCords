package com.example.fullstack.service.member.impl;

import com.example.fullstack.dto.member.MemberDTO;
import com.example.fullstack.entity.member.MemberEntity;
import com.example.fullstack.repository.member.MemberRepository;
import com.example.fullstack.security.exception.CustomException;
import com.example.fullstack.security.jwt.JwtTokenProvider;
import com.example.fullstack.security.jwt.JwtToken;
import com.example.fullstack.service.member.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    @Override
    public void memberSingUp(MemberDTO memberDTO) {
        // 비밀번호 인코딩
        String encodedPassword = passwordEncoder.encode(memberDTO.getUserPwd());
        memberDTO.setUserPwd(encodedPassword);

        // DTO -> Entity 변환 및 저장
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDTO);
        memberRepository.save(memberEntity);
    }

    @Override
    public JwtToken memberLogin(MemberDTO memberDTO) {
        // 사용자 인증
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(memberDTO.getUserId(), memberDTO.getUserPwd())
        );

        // 인증된 사용자의 ID를 기반으로 JWT 토큰 생성
        return jwtTokenProvider.createToken(authentication.getName(), authentication.getAuthorities());
    }
}



