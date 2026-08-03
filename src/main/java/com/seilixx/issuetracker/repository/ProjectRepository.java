package com.seilixx.issuetracker.repository;

import com.seilixx.issuetracker.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,Long> {

}
