package com.seilixx.issuetracker.repository;

import com.seilixx.issuetracker.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    List<Attachment> findByIssueId(Long issueId);

    @Query("SELECT a FROM Attachment a " +
            "LEFT JOIN FETCH a.uploadedBy " +
            "WHERE a.issue.id = :issueId " +
            "ORDER BY a.id ASC")
    List<Attachment> findDetailByIssueId(@Param("issueId") Long issueId);
}
