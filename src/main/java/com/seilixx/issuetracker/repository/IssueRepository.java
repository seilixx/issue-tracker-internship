package com.seilixx.issuetracker.repository;

import com.seilixx.issuetracker.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue,Long> {
}
