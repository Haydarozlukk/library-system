package com.example.library_system.controller;

import com.example.library_system.model.MaintenanceRequest;
import com.example.library_system.service.MaintenanceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance-requests")
public class MaintenanceRequestController {

    @Autowired
    private MaintenanceRequestService maintenanceRequestService;

    @GetMapping
    public List<MaintenanceRequest> getAllMaintenanceRequests() {
        return maintenanceRequestService.getAllMaintenanceRequests();
    }

    @PostMapping
    public MaintenanceRequest createMaintenanceRequest(@RequestBody MaintenanceRequest maintenanceRequest) {
        return maintenanceRequestService.createMaintenanceRequest(maintenanceRequest);
    }

    @PutMapping("/{id}/complete")
    public MaintenanceRequest completeMaintenanceRequest(@PathVariable Long id) {
        return maintenanceRequestService.completeMaintenanceRequest(id);
    }
}
