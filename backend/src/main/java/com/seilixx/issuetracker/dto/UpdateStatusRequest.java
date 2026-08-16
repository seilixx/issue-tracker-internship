package com.seilixx.issuetracker.dto;

import com.seilixx.issuetracker.entity.Status;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateStatusRequest {

    @NotNull(message = "status is obligatory")
    private Status status;
}
