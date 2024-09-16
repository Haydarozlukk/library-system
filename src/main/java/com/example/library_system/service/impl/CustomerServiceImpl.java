package com.example.library_system.service.impl;

import com.example.library_system.model.Customer;
import com.example.library_system.repository.CustomerRepository;
import com.example.library_system.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Long id, Customer customerDetails) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        customer.setName(customerDetails.getName());
        customer.setEmail(customerDetails.getEmail());
        // Diğer alanları da burada güncelleyebilirsiniz

        return customerRepository.save(customer);
    }

    @Override
    public String deleteCustomer(Long id) {
        customerRepository.deleteById(id);
        return "Müşteri başarıyla silindi!";
    }

    // Şifre sıfırlama işlemi için yeni metotlar:

    @Override
    public Customer findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    @Override
    public void savePasswordResetToken(Customer customer, String token) {
        // Burada token'ı veritabanına kaydedebilir veya basit bir şekilde loglayabilirsiniz
        System.out.println("Token " + token + " kullanıcı için kaydedildi: " + customer.getEmail());
    }
}
