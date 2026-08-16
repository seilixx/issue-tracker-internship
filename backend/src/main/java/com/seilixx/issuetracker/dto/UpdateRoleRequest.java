package com.seilixx.issuetracker.dto;

import com.seilixx.issuetracker.entity.Role;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateRoleRequest {

    @NotNull(message = "role is obligatory")
    private Role role;
}
