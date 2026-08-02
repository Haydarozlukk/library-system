package com.example.library_system.config;

import com.example.library_system.model.Admin;
import com.example.library_system.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class InitialAdminSeeder {

    @Value("${library.initial-admin.email:}")
    private String initialAdminEmail;

    @Value("${library.initial-admin.password:}")
    private String initialAdminPassword;

    @Bean
    public CommandLineRunner seedInitialAdmin(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (adminRepository.count() > 0) {
                return;
            }
            if (initialAdminEmail.isBlank() || initialAdminPassword.isBlank()) {
                return;
            }

            Admin admin = new Admin();
            admin.setName("Sistem Yöneticisi");
            admin.setEmail(initialAdminEmail);
            admin.setPassword(passwordEncoder.encode(initialAdminPassword));
            admin.setRole("ADMIN");
            admin.setActive(true);
            adminRepository.save(admin);
        };
    }
}
