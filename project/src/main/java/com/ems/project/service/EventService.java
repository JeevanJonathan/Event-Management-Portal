package com.ems.project.service;

import com.ems.project.entity.User;
import com.ems.project.payload.EventDTO;

public interface EventService {
    EventDTO createEvent(EventDTO eventDTO, User user);
}
