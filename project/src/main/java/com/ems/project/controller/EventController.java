package com.ems.project.controller;

import com.ems.project.entity.User;
import com.ems.project.payload.EventDTO;
import com.ems.project.service.EventService;
import com.ems.project.utils.AuthUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private AuthUtils authUtils;

    @PostMapping("events")
    public ResponseEntity<EventDTO> createEvent(@Valid @RequestBody EventDTO eventDTO) {
        User user = authUtils.loggedInUser();
        EventDTO newEvent = eventService.createEvent(eventDTO, user);
        return new ResponseEntity<>(newEvent, HttpStatus.CREATED);
    }
}
