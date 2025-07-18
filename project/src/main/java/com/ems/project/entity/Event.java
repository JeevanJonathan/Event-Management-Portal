package com.ems.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    private String eventName;
    private String eventType;
    private LocalDate eventDate;
    private String eventLocation;
    private String eventCity;
    private String eventState;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
    
}
