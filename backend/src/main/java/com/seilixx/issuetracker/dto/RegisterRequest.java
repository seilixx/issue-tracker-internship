package com.seilixx.issuetracker.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;

    @NotBlank(message = "username obligatory")
    private String username;

    @NotBlank(message = "Email is obligatory")
    @Email(message = "email format non valid")
    private String mail;

    @NotBlank(message = "password is obligatory")
    @Size(min = 6, message = "password should at least contain 6 characters")
    private String password;

}