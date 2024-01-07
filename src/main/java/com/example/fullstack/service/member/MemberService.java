package com.example.fullstack.service.member;


import com.example.fullstack.dto.member.MemberDTO;
import com.example.fullstack.entity.member.MemberEntity;
import com.example.fullstack.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public void memberSave(MemberDTO memberDTO) {
        /*
            1. DTO -> Entity 객체로 변환
            2. repository save method 호출 (조건. Entity 객체를 넘겨줘야함!)
         */
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDTO);
        memberRepository.save(memberEntity);
    }
}
