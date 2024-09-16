package com.example.library_system.controller;

import com.example.library_system.service.CustomerService;
import com.example.library_system.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // Mevcut işlemler:
    @GetMapping("/all")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PostMapping("/create")
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }

    @PutMapping("/update/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails) {
        return customerService.updateCustomer(id, customerDetails);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCustomer(@PathVariable Long id) {
        return customerService.deleteCustomer(id);
    }

    // Şifre sıfırlama isteği ekliyoruz:
    @PostMapping("/password-reset/request")
    public String requestPasswordReset(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        Customer customer = customerService.findByEmail(email);
        if (customer == null) {
            return "Kullanıcı bulunamadı!";
        }

        // Rastgele bir token oluşturuyoruz
        String token = UUID.randomUUID().toString();

        // Token'ı kaydetmek için servisi çağırıyoruz
        customerService.savePasswordResetToken(customer, token);

        // Bu kısımda e-posta gönderme işlemi yapılabilir
        return "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.";
    }
}
