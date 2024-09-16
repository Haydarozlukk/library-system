package com.example.library_system.service;

import com.example.library_system.model.Customer;

import java.util.List;

public interface CustomerService {
    List<Customer> getAllCustomers();

    Customer createCustomer(Customer customer);

    Customer updateCustomer(Long id, Customer customerDetails);

    String deleteCustomer(Long id);

    // Şifre sıfırlama işlemi için yeni metotlar:
    Customer findByEmail(String email);

    void savePasswordResetToken(Customer customer, String token);
}
