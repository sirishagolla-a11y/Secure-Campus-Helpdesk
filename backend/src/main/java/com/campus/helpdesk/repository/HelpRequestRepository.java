package com.campus.helpdesk.repository;

import com.campus.helpdesk.entity.Category;
import com.campus.helpdesk.entity.HelpRequest;
import com.campus.helpdesk.entity.Priority;
import com.campus.helpdesk.entity.Status;
import com.campus.helpdesk.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HelpRequestRepository extends JpaRepository<HelpRequest, Long> {
    
    List<HelpRequest> findByStudentOrderByCreatedAtDesc(User student);

    List<HelpRequest> findAllByOrderByCreatedAtDesc();

    @Query("SELECT r FROM HelpRequest r WHERE " +
           "(:status IS NULL OR r.status = :status) AND " +
           "(:category IS NULL OR r.category = :category) AND " +
           "(:priority IS NULL OR r.priority = :priority) " +
           "ORDER BY r.createdAt DESC")
    List<HelpRequest> filterRequests(@Param("status") Status status,
                                     @Param("category") Category category,
                                     @Param("priority") Priority priority);

    long countByStatus(Status status);
}
