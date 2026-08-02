package com.example.library_system.controller;

import com.example.library_system.dto.AuthResponse;
import com.example.library_system.dto.LoginRequest;
import com.example.library_system.dto.RegisterRequest;
import com.example.library_system.model.Admin;
import com.example.library_system.model.Customer;
import com.example.library_system.repository.AdminRepository;
import com.example.library_system.repository.CustomerRepository;
import com.example.library_system.security.AppUserPrincipal;
import com.example.library_system.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (request.getEmail() == null || request.getPassword() == null || request.getName() == null) {
            return ResponseEntity.badRequest().body("İsim, e-posta ve şifre zorunludur.");
        }
        if (adminRepository.findByEmail(request.getEmail()) != null
                || customerRepository.findByEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Bu e-posta ile kayıtlı bir kullanıcı zaten var.");
        }

        Customer customer = new Customer();
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customer.setAddress(request.getAddress());
        customer.setPhoneNumber(request.getPhoneNumber());
        customerRepository.save(customer);

        AppUserPrincipal principal = AppUserPrincipal.fromCustomer(customer);
        String token = jwtService.generateToken(principal);
        return ResponseEntity.ok(new AuthResponse(token, "CUSTOMER", customer.getId(), customer.getName(), customer.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (Exception ex) {
            return ResponseEntity.status(401).body("E-posta veya şifre hatalı.");
        }

        Admin admin = adminRepository.findByEmail(request.getEmail());
        if (admin != null) {
            AppUserPrincipal principal = AppUserPrincipal.fromAdmin(admin);
            String token = jwtService.generateToken(principal);
            return ResponseEntity.ok(new AuthResponse(token, "ADMIN", admin.getId(), admin.getName(), admin.getEmail()));
        }

        Customer customer = customerRepository.findByEmail(request.getEmail());
        AppUserPrincipal principal = AppUserPrincipal.fromCustomer(customer);
        String token = jwtService.generateToken(principal);
        return ResponseEntity.ok(new AuthResponse(token, "CUSTOMER", customer.getId(), customer.getName(), customer.getEmail()));
    }
}
