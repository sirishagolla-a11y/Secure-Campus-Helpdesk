package com.campus.helpdesk.service;

import com.campus.helpdesk.dto.CreateRequestDTO;
import com.campus.helpdesk.dto.RequestResponseDTO;
import com.campus.helpdesk.dto.StatusUpdateDTO;
import com.campus.helpdesk.entity.*;
import com.campus.helpdesk.repository.HelpRequestRepository;
import com.campus.helpdesk.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HelpRequestServiceTest {

    @Mock
    private HelpRequestRepository helpRequestRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private HelpRequestService helpRequestService;

    private User student;
    private CreateRequestDTO createDTO;

    @BeforeEach
    void setUp() {
        student = new User(1L, "Alex Student", "alex@campus.edu", "pass123", Role.STUDENT);
        createDTO = new CreateRequestDTO("Projector Not Working", "Projector bulb is blown", Category.FACILITIES, Priority.HIGH);
    }

    @Test
    void createRequest_Success() {
        when(userRepository.findByEmail("alex@campus.edu")).thenReturn(Optional.of(student));

        HelpRequest savedRequest = new HelpRequest();
        savedRequest.setId(10L);
        savedRequest.setStudent(student);
        savedRequest.setTitle(createDTO.getTitle());
        savedRequest.setDescription(createDTO.getDescription());
        savedRequest.setCategory(createDTO.getCategory());
        savedRequest.setPriority(createDTO.getPriority());
        savedRequest.setStatus(Status.PENDING);

        when(helpRequestRepository.save(any(HelpRequest.class))).thenReturn(savedRequest);

        RequestResponseDTO result = helpRequestService.createRequest(createDTO, "alex@campus.edu");

        assertNotNull(result);
        assertEquals(10L, result.getId());
        assertEquals("Projector Not Working", result.getTitle());
        assertEquals(Status.PENDING, result.getStatus());
        assertEquals(Category.FACILITIES, result.getCategory());
    }

    @Test
    void updateRequestStatus_Success() {
        HelpRequest existingRequest = new HelpRequest();
        existingRequest.setId(10L);
        existingRequest.setStudent(student);
        existingRequest.setTitle("WiFi Outage");
        existingRequest.setStatus(Status.PENDING);

        when(helpRequestRepository.findById(10L)).thenReturn(Optional.of(existingRequest));
        when(helpRequestRepository.save(any(HelpRequest.class))).thenAnswer(invocation -> invocation.getArgument(0));

        StatusUpdateDTO updateDTO = new StatusUpdateDTO(Status.RESOLVED, "Router rebooted successfully");
        RequestResponseDTO result = helpRequestService.updateRequestStatus(10L, updateDTO);

        assertNotNull(result);
        assertEquals(Status.RESOLVED, result.getStatus());
        assertEquals("Router rebooted successfully", result.getAdminNote());
    }
}
