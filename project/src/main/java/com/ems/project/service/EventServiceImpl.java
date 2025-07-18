package com.ems.project.service;

import com.ems.project.entity.Event;
import com.ems.project.entity.User;
import com.ems.project.payload.EventDTO;
import com.ems.project.repository.EventRepository;
import com.ems.project.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventServiceImpl implements EventService{

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Override
    public EventDTO createEvent(EventDTO eventDTO, User user) {
        Event event = modelMapper.map(eventDTO, Event.class);
        event.setUser(user);
        Event newEvent = eventRepository.save(event);
        return modelMapper.map(newEvent, EventDTO.class);
    }
}
