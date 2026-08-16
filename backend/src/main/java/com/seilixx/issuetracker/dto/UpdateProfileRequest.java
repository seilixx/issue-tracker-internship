package com.seilixx.issuetracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateProfileRequest {

    @NotBlank(message = "first name necessary")
    private String firstName;

    @NotBlank(message = "last name necessary")
    private String lastName;

    private String bio;
}
