package com.example.fullstack.service.member;


import com.example.fullstack.dto.member.MemberDTO;
import com.example.fullstack.entity.member.MemberEntity;
import com.example.fullstack.repository.member.MemberRepository;
import com.example.fullstack.security.exception.CustomException;
import com.example.fullstack.security.jwt.JwtProvider;
import com.example.fullstack.security.jwt.JwtToken;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@Builder
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;


    public void memberSingUp(MemberDTO memberDTO) {
        // 비밀번호 인코딩
        String encodedPassword = passwordEncoder.encode(memberDTO.getUserPwd());
        memberDTO.setUserPwd(encodedPassword);

        // DTO -> Entity 변환 및 저장
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDTO);
        memberRepository.save(memberEntity);
    }

    public JwtToken memberLogin(MemberDTO memberDTO) {
        MemberEntity memberEntity = memberRepository.findByUserId(memberDTO.getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(memberDTO.getUserPwd(), memberEntity.getUserPwd())) {
            throw new CustomException("비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED);
        }
        return jwtProvider.generateToken(memberEntity.getUserId());
    }
}