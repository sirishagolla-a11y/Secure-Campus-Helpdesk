package com.campus.helpdesk.controller;

import com.campus.helpdesk.dto.*;
import com.campus.helpdesk.entity.Category;
import com.campus.helpdesk.entity.Priority;
import com.campus.helpdesk.entity.Status;
import com.campus.helpdesk.service.HelpRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminRequestController {

    private final HelpRequestService helpRequestService;

    @Autowired
    public AdminRequestController(HelpRequestService helpRequestService) {
        this.helpRequestService = helpRequestService;
    }

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<List<RequestResponseDTO>>> getAllRequests(
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) Priority priority) {
        List<RequestResponseDTO> requests = helpRequestService.getAllRequestsForAdmin(status, category, priority);
        return ResponseEntity.ok(ApiResponse.success("Admin requests retrieved", requests));
    }

    @GetMapping("/requests/{id}")
    public ResponseEntity<ApiResponse<RequestResponseDTO>> getRequestById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        RequestResponseDTO response = helpRequestService.getRequestByIdForUser(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Request details retrieved", response));
    }

    @PutMapping("/requests/{id}/status")
    public ResponseEntity<ApiResponse<RequestResponseDTO>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateDTO dto) {
        RequestResponseDTO response = helpRequestService.updateRequestStatus(id, dto);
        return ResponseEntity.ok(ApiResponse.success("Request status updated successfully", response));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsDTO>> getDashboardStats() {
        DashboardStatsDTO stats = helpRequestService.getAdminDashboardStats();
        return ResponseEntity.ok(ApiResponse.success("Admin dashboard stats retrieved", stats));
    }
}
