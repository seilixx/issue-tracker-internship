package com.seilixx.issuetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.seilixx.issuetracker.entity.Comment;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c FROM Comment c " +
            "LEFT JOIN FETCH c.authorUser " +
            "LEFT JOIN FETCH c.parentComment " +
            "WHERE c.issue.id = :issueId " +
            "ORDER BY c.id ASC")
    List<Comment> findDetailByIssueId(@Param("issueId") Long issueId);
}
