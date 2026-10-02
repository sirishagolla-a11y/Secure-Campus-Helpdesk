package com.campus.helpdesk.dto;

import com.campus.helpdesk.entity.Category;
import com.campus.helpdesk.entity.HelpRequest;
import com.campus.helpdesk.entity.Priority;
import com.campus.helpdesk.entity.Status;

import java.time.LocalDateTime;

public class RequestResponseDTO {

    private Long id;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private String title;
    private String description;
    private Category category;
    private Priority priority;
    private Status status;
    private String adminNote;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public RequestResponseDTO() {
    }

    public RequestResponseDTO(HelpRequest request) {
        this.id = request.getId();
        if (request.getStudent() != null) {
            this.studentId = request.getStudent().getId();
            this.studentName = request.getStudent().getName();
            this.studentEmail = request.getStudent().getEmail();
        }
        this.title = request.getTitle();
        this.description = request.getDescription();
        this.category = request.getCategory();
        this.priority = request.getPriority();
        this.status = request.getStatus();
        this.adminNote = request.getAdminNote();
        this.createdAt = request.getCreatedAt();
        this.updatedAt = request.getUpdatedAt();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getAdminNote() {
        return adminNote;
    }

    public void setAdminNote(String adminNote) {
        this.adminNote = adminNote;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
