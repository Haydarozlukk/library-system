package com.example.library_system.service;

import com.example.library_system.model.Admin;

import java.util.List;

public interface AdminService {
    List<Admin> getAllAdmins();

    Admin createAdmin(Admin admin);

    Admin updateAdmin(Long id, Admin adminDetails);

    String deleteAdmin(Long id);
}
