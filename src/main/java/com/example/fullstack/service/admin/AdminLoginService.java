package com.example.fullstack.service.admin;

import com.example.fullstack.dto.admin.AdminDTO;
import org.springframework.stereotype.Service;

@Service
public interface AdminLoginService {

    String adminLogin(AdminDTO adminDTO);
}
