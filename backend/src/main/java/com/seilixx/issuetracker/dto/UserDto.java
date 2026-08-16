package com.seilixx.issuetracker.dto;

import com.seilixx.issuetracker.entity.Role;
import lombok.Data;

@Data
public class UserDto {
    private String uuid;
    private String firstName;
    private String lastName;
    private String username;
    private Role role;
}
