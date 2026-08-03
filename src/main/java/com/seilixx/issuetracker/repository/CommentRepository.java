package com.seilixx.issuetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.seilixx.issuetracker.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

}
