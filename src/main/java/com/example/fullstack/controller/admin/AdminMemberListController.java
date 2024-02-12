package com.example.fullstack.controller.admin;

import com.example.fullstack.dto.member.MemberDTO;
import com.example.fullstack.service.admin.AdminMemberListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class AdminMemberListController {

    private final AdminMemberListService adminMemberListService;

    /*
        1. 전체 회원 목록 조회하기 때문에 List 타입 사용!
     */
    @GetMapping("/api/user/list")
    public ResponseEntity<List<MemberDTO>> getAllMembers() {
        List<MemberDTO> members = adminMemberListService.getAllMembers();
        return ResponseEntity.ok(members);
    }
}
