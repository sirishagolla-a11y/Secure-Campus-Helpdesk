package com.campus.helpdesk.controller;

import com.campus.helpdesk.dto.ApiResponse;
import com.campus.helpdesk.dto.CreateRequestDTO;
import com.campus.helpdesk.dto.RequestResponseDTO;
import com.campus.helpdesk.service.HelpRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class StudentRequestController {

    private final HelpRequestService helpRequestService;

    @Autowired
    public StudentRequestController(HelpRequestService helpRequestService) {
        this.helpRequestService = helpRequestService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RequestResponseDTO>> createRequest(
            @Valid @RequestBody CreateRequestDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        RequestResponseDTO response = helpRequestService.createRequest(dto, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Help request submitted successfully", response));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<RequestResponseDTO>>> getMyRequests(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<RequestResponseDTO> requests = helpRequestService.getMyRequests(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("User requests retrieved successfully", requests));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RequestResponseDTO>> getRequestById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        RequestResponseDTO response = helpRequestService.getRequestByIdForUser(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Request details retrieved", response));
    }
}
