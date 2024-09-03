package com.example.library_system.service.impl;

import com.example.library_system.model.DamagedBook;
import com.example.library_system.service.EmailService;
import com.example.library_system.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private EmailService emailService;

    @Override
    public void sendNotification(DamagedBook book) {
        String subject = "Maintenance Required for Book ID: " + book.getBook().getId();
        String text = "The book titled '" + book.getBook().getTitle() + "' reported by "
                + book.getReportedBy().getName() + " requires maintenance. "
                + "Please check the system for more details.";

        // Örnek e-posta adresi
        String recipientEmail = "maintenance-team@example.com";

        // Bildirim gönderme
        emailService.sendEmail(recipientEmail, subject, text);

        // Konsol çıktısı (debug amaçlı)
        System.out.println("Notification email sent for Book ID: " + book.getBook().getId());
    }
}
