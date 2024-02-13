package com.example.fullstack.repository.member;

import com.example.fullstack.entity.member.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    Optional<MemberEntity> findByUserNo(Long userNo);
    Optional<MemberEntity> findByUserId(String userId);
}
