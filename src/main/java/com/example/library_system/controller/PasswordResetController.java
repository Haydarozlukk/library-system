package com.example.library_system.controller;

import com.example.library_system.model.Customer;
import com.example.library_system.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.Map;

@RestController
@RequestMapping("/password-reset")
public class PasswordResetController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/request")
    public String requestPasswordReset(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        Customer customer = customerService.findByEmail(email);
        if (customer == null) {
            return "Kullanıcı bulunamadı!";
        }

        String token = UUID.randomUUID().toString();
        customerService.savePasswordResetToken(customer, token);

        // Bu kısımda e-posta gönderme işlemi yapılabilir.
        return "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.";
    }
}
