package com.example.library_system.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class MaintenanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private DamagedBook damagedBook;

    private Date requestedDate;

    @ManyToOne
    private Admin maintenanceStaff; // Maintenance staff assumed to be admin for now

    private Date completedDate;

}
