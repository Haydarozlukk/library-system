package com.example.library_system.service.impl;

import com.example.library_system.model.MaintenanceRequest;
import com.example.library_system.repository.MaintenanceRequestRepository;
import com.example.library_system.service.MaintenanceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MaintenanceRequestServiceImpl implements MaintenanceRequestService {

    @Autowired
    private MaintenanceRequestRepository maintenanceRequestRepository;

    @Override
    public List<MaintenanceRequest> getAllMaintenanceRequests() {
        return maintenanceRequestRepository.findAll();
    }

    @Override
    public MaintenanceRequest createMaintenanceRequest(MaintenanceRequest maintenanceRequest) {
        maintenanceRequest.setRequestedDate(new Date());
        return maintenanceRequestRepository.save(maintenanceRequest);
    }

    @Override
    public MaintenanceRequest completeMaintenanceRequest(Long id) {
        Optional<MaintenanceRequest> request = maintenanceRequestRepository.findById(id);
        if (request.isPresent()) {
            MaintenanceRequest maintenanceRequest = request.get();
            maintenanceRequest.setCompletedDate(new Date());
            return maintenanceRequestRepository.save(maintenanceRequest);
        } else {
            throw new RuntimeException("Maintenance request not found with id: " + id);
        }
    }
}
