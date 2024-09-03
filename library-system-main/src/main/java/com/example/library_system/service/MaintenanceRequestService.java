package com.example.library_system.service;

import com.example.library_system.model.MaintenanceRequest;

import java.util.List;

public interface MaintenanceRequestService {
    List<MaintenanceRequest> getAllMaintenanceRequests();
    MaintenanceRequest createMaintenanceRequest(MaintenanceRequest maintenanceRequest);
    MaintenanceRequest completeMaintenanceRequest(Long id);
}
