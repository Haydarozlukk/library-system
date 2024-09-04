package com.example.library_system.service.impl;

import com.example.library_system.model.Admin;
import com.example.library_system.repository.AdminRepository;
import com.example.library_system.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Admin updateAdmin(Long id, Admin adminDetails) {
        Optional<Admin> optionalAdmin = adminRepository.findById(id);
        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();
            admin.setName(adminDetails.getName());
            return adminRepository.save(admin);
        }
        return null;
    }

    @Override
    public String deleteAdmin(Long id) {
        adminRepository.deleteById(id);
        return "Admin deleted successfully";
    }
}
