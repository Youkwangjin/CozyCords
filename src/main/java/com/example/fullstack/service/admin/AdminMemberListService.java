package com.example.fullstack.service.admin;

import com.example.fullstack.dto.member.MemberDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminMemberListService {

    List<MemberDTO> getAllMembers();
}
