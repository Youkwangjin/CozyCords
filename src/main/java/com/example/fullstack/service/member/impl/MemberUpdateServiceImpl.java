package com.example.fullstack.service.member.impl;

import com.example.fullstack.dto.member.MemberDTO;
import com.example.fullstack.entity.member.MemberEntity;
import com.example.fullstack.repository.member.MemberRepository;
import com.example.fullstack.security.exception.CustomException;
import com.example.fullstack.security.jwt.JwtTokenProvider;
import com.example.fullstack.security.jwt.JwtToken;
import com.example.fullstack.service.member.MemberUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Collection;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberUpdateServiceImpl implements MemberUpdateService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public MemberDTO getUserInfo(String userId) {
        /*
            1. 데이터베이스에서 userId에 해당하는 사용자 정보를 조회한다.
            2. 조회된 사용자 정보가 있는지 확인한다.
            3. MemberEntity -> MemberDTO 변환한다.
         */
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByUserId(userId);
        if (optionalMemberEntity.isPresent()) {
            // 사용자 정보가 있다면, MemberEntity 객체를 get() 통해 optional 를 제거하고 확인한다
            MemberEntity memberEntity = optionalMemberEntity.get();
            return MemberDTO.toMemberDTO(memberEntity);
        } else {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }
    }

    @Override
    public JwtToken updateUser(MemberDTO memberDTO) {
        MemberEntity memberEntity = memberRepository.findByUserId(memberDTO.getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        // 비밀번호가 제공된 경우 업데이트
        if (memberDTO.getUserPwd() != null && !memberDTO.getUserPwd().isEmpty()) {
            memberEntity.setUserPwd(passwordEncoder.encode(memberDTO.getUserPwd()));
        }

        // 나머지 정보를 업데이트
        memberEntity.setUserNo(memberEntity.getUserNo());
        memberEntity.setUserName(memberDTO.getUserName());
        memberEntity.setUserNickname(memberDTO.getUserNickname());
        memberEntity.setUserAge(memberDTO.getUserAge());
        memberEntity.setUserTel(memberDTO.getUserTel());
        memberEntity.setUserAddress(memberDTO.getUserAddress());

        memberRepository.save(memberEntity);

        // 사용자 권한 설정 ("ROLE_USER")
        Collection<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));

        return jwtTokenProvider.createToken(memberEntity.getUserId(), authorities);
    }

    @Override
    public JwtToken refreshAccessToken(String refreshToken) {
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new CustomException("리프레시 토큰이 유효하지 않습니다.", HttpStatus.UNAUTHORIZED);
        }
        String userId = jwtTokenProvider.getUserIdFromToken(refreshToken);

        // 사용자 권한 설정 (기본값: "ROLE_USER")
        Collection<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));

        return jwtTokenProvider.createToken(userId, authorities);
    }
}
