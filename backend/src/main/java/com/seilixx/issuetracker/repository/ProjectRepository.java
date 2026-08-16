package com.seilixx.issuetracker.repository;

import com.seilixx.issuetracker.entity.Project;
import com.seilixx.issuetracker.entity.ProjectCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Long> {
    List<Project> findByCategory(ProjectCategory category);
}
