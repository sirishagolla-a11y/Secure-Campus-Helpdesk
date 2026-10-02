package com.campus.helpdesk.service;

import com.campus.helpdesk.dto.*;
import com.campus.helpdesk.entity.*;
import com.campus.helpdesk.repository.HelpRequestRepository;
import com.campus.helpdesk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class HelpRequestService {

    private final HelpRequestRepository helpRequestRepository;
    private final UserRepository userRepository;

    @Autowired
    public HelpRequestService(HelpRequestRepository helpRequestRepository, UserRepository userRepository) {
        this.helpRequestRepository = helpRequestRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public RequestResponseDTO createRequest(CreateRequestDTO dto, String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));

        HelpRequest request = new HelpRequest();
        request.setStudent(student);
        request.setTitle(dto.getTitle());
        request.setDescription(dto.getDescription());
        request.setCategory(dto.getCategory());
        request.setPriority(dto.getPriority());
        request.setStatus(Status.PENDING);

        HelpRequest saved = helpRequestRepository.save(request);
        return new RequestResponseDTO(saved);
    }

    @Transactional(readOnly = true)
    public List<RequestResponseDTO> getMyRequests(String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));

        return helpRequestRepository.findByStudentOrderByCreatedAtDesc(student)
                .stream()
                .map(RequestResponseDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public RequestResponseDTO getRequestByIdForUser(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        HelpRequest request = helpRequestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Help request not found with id: " + id));

        // If user is STUDENT, check ownership
        if (user.getRole() == Role.STUDENT && !request.getStudent().getId().equals(user.getId())) {
            throw new SecurityException("Access denied: You can only view your own requests");
        }

        return new RequestResponseDTO(request);
    }

    @Transactional(readOnly = true)
    public List<RequestResponseDTO> getAllRequestsForAdmin(Status status, Category category, Priority priority) {
        return helpRequestRepository.filterRequests(status, category, priority)
                .stream()
                .map(RequestResponseDTO::new)
                .toList();
    }

    @Transactional
    public RequestResponseDTO updateRequestStatus(Long id, StatusUpdateDTO dto) {
        HelpRequest request = helpRequestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Help request not found with id: " + id));

        request.setStatus(dto.getStatus());
        if (dto.getAdminNote() != null) {
            request.setAdminNote(dto.getAdminNote());
        }

        HelpRequest updated = helpRequestRepository.save(request);
        return new RequestResponseDTO(updated);
    }

    @Transactional(readOnly = true)
    public DashboardStatsDTO getAdminDashboardStats() {
        long total = helpRequestRepository.count();
        long pending = helpRequestRepository.countByStatus(Status.PENDING);
        long inProgress = helpRequestRepository.countByStatus(Status.IN_PROGRESS);
        long resolved = helpRequestRepository.countByStatus(Status.RESOLVED);
        long rejected = helpRequestRepository.countByStatus(Status.REJECTED);

        return new DashboardStatsDTO(total, pending, inProgress, resolved, rejected);
    }
}
