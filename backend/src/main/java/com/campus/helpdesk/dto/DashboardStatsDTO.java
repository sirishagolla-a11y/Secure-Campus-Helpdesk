package com.campus.helpdesk.dto;

public class DashboardStatsDTO {

    private long totalRequests;
    private long pendingRequests;
    private long inProgressRequests;
    private long resolvedRequests;
    private long rejectedRequests;

    public DashboardStatsDTO() {
    }

    public DashboardStatsDTO(long totalRequests, long pendingRequests, long inProgressRequests, long resolvedRequests, long rejectedRequests) {
        this.totalRequests = totalRequests;
        this.pendingRequests = pendingRequests;
        this.inProgressRequests = inProgressRequests;
        this.resolvedRequests = resolvedRequests;
        this.rejectedRequests = rejectedRequests;
    }

    public long getTotalRequests() {
        return totalRequests;
    }

    public void setTotalRequests(long totalRequests) {
        this.totalRequests = totalRequests;
    }

    public long getPendingRequests() {
        return pendingRequests;
    }

    public void setPendingRequests(long pendingRequests) {
        this.pendingRequests = pendingRequests;
    }

    public long getInProgressRequests() {
        return inProgressRequests;
    }

    public void setInProgressRequests(long inProgressRequests) {
        this.inProgressRequests = inProgressRequests;
    }

    public long getResolvedRequests() {
        return resolvedRequests;
    }

    public void setResolvedRequests(long resolvedRequests) {
        this.resolvedRequests = resolvedRequests;
    }

    public long getRejectedRequests() {
        return rejectedRequests;
    }

    public void setRejectedRequests(long rejectedRequests) {
        this.rejectedRequests = rejectedRequests;
    }
}
