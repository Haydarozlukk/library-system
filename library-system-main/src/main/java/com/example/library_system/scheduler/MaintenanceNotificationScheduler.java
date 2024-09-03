package com.example.library_system.scheduler;

import com.example.library_system.model.DamagedBook;
import com.example.library_system.repository.DamagedBookRepository;
import com.example.library_system.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class MaintenanceNotificationScheduler {

    @Autowired
    private DamagedBookRepository damagedBookRepository;

    @Autowired
    private NotificationService notificationService;

    // Bu metod her gün öğlen 12'de çalışacak şekilde ayarlandı
    @Scheduled(cron = "0 0 12 * * ?")
    public void sendMaintenanceNotifications() {
        Date currentDate = new Date();
        List<DamagedBook> damagedBooks = damagedBookRepository.findAll();

        for (DamagedBook book : damagedBooks) {
            if ("PENDING".equals(book.getStatus())) {
                long diffInMillies = Math.abs(currentDate.getTime() - book.getReportedDate().getTime());
                long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);

                if (diff > 7) {
                    notificationService.sendNotification(book);
                }
            }
        }
    }
}
