package com.example.fullstack.service.member.impl;

import com.example.fullstack.repository.member.MemberRepository;
import com.example.fullstack.service.member.MemberIdCheckService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberIdCheckServiceImpl implements MemberIdCheckService {

    private final MemberRepository memberRepository;
    @Override
    public boolean userIdCheck(String userId) {
        return memberRepository.findByUserId(userId).isEmpty();
    }
}
