package com.example.library_system.security;

import com.example.library_system.model.Admin;
import com.example.library_system.model.Customer;
import com.example.library_system.repository.AdminRepository;
import com.example.library_system.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null) {
            return AppUserPrincipal.fromAdmin(admin);
        }

        Customer customer = customerRepository.findByEmail(email);
        if (customer != null) {
            return AppUserPrincipal.fromCustomer(customer);
        }

        throw new UsernameNotFoundException("Kullanıcı bulunamadı: " + email);
    }
}
