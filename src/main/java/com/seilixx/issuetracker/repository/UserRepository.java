package com.seilixx.issuetracker.repository;

import com.seilixx.issuetracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

}
