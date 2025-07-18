package com.ems.project.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDTO {
    private Long eventId;
    private String eventName;
    private String eventType;
    private LocalDate eventDate;
    private String eventLocation;
    private String eventCity;
    private String eventState;
}
