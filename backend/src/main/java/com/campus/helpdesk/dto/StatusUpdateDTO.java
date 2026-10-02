package com.campus.helpdesk.dto;

import com.campus.helpdesk.entity.Status;
import jakarta.validation.constraints.NotNull;

public class StatusUpdateDTO {

    @NotNull(message = "Status is required")
    private Status status;

    private String adminNote;

    public StatusUpdateDTO() {
    }

    public StatusUpdateDTO(Status status, String adminNote) {
        this.status = status;
        this.adminNote = adminNote;
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
}
