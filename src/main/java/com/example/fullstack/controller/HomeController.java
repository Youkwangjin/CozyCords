package com.example.fullstack.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/api/hello")
    public String Index() {
        return "안녕하세요 메인 홈페이지 입니다.";
    }
}
