package com.seilixx.issuetracker.repository;

import com.seilixx.issuetracker.entity.Issue;
import com.seilixx.issuetracker.entity.Priority;
import com.seilixx.issuetracker.entity.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByProjectId(Long projectId);
    List<Issue> findByStatus(Status status);
    List<Issue> findByPriority(Priority priority);
    List<Issue> findByProjectIdAndStatus(Long projectId, Status status);
    @Query("SELECT i FROM Issue i JOIN i.assignees a WHERE a.uuid = :assigneeUuid")
    List<Issue> findByAssigneeUuid(@Param("assigneeUuid") String assigneeUuid);

    Page<Issue> findByAssignees_Uuid(String uuid, Pageable pageable);
    Page<Issue> findByClosedBy_Uuid(String uuid, Pageable pageable);

    @Query("SELECT DISTINCT i FROM Issue i LEFT JOIN i.assignees a WHERE " +
            "(:projectId IS NULL OR i.project.id = :projectId) AND " +
            "(:status IS NULL OR i.status = :status) AND " +
            "(:priority IS NULL OR i.priority = :priority) AND " +
            "(:assigneeUuid IS NULL OR a.uuid = :assigneeUuid)")
    Page<Issue> findByFilters(
            @Param("projectId") Long projectId,
            @Param("status") Status status,
            @Param("priority") Priority priority,
            @Param("assigneeUuid") String assigneeUuid,
            Pageable pageable);

    // Hibernate can't JOIN FETCH more than one collection (bag) association in a single query
    // (MultipleBagFetchException) - assignees is the only collection fetched here; comments and
    // attachments are loaded via their own fetch-joined queries in IssueService.getIssueById.
    @Query("SELECT i FROM Issue i " +
            "LEFT JOIN FETCH i.project " +
            "LEFT JOIN FETCH i.creator " +
            "LEFT JOIN FETCH i.closedBy " +
            "LEFT JOIN FETCH i.assignees " +
            "WHERE i.id = :id")
    Optional<Issue> findDetailById(@Param("id") Long id);

}





