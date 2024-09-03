package com.example.library_system.service;

public interface EmailService {
    void sendEmail(String to, String subject, String text);
}
