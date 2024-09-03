package com.example.library_system.service;

import com.example.library_system.model.DamagedBook;

public interface NotificationService {
    void sendNotification(DamagedBook book);
}
