package com.example.fullstack.service.member;

import org.springframework.stereotype.Service;

@Service
public interface MemberIdCheckService {
    boolean userIdCheck(String userId);
}
