package com.example.library_system.security;

import com.example.library_system.model.Admin;
import com.example.library_system.model.Customer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class AppUserPrincipal implements UserDetails {

    private final Long id;
    private final String name;
    private final String email;
    private final String password;
    private final String role;

    private AppUserPrincipal(Long id, String name, String email, String password, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public static AppUserPrincipal fromAdmin(Admin admin) {
        return new AppUserPrincipal(admin.getId(), admin.getName(), admin.getEmail(), admin.getPassword(), "ADMIN");
    }

    public static AppUserPrincipal fromCustomer(Customer customer) {
        return new AppUserPrincipal(customer.getId(), customer.getName(), customer.getEmail(), customer.getPassword(), "CUSTOMER");
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
