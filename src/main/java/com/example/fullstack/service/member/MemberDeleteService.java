package com.example.fullstack.service.member;

import org.springframework.stereotype.Service;

@Service
public interface MemberDeleteService {
    void deleteUser(String userId, String userPwd, boolean isAdmin);
}