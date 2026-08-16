package com.seilixx.issuetracker.dto;

import com.seilixx.issuetracker.entity.ProjectCategory;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateCategoryRequest {

    @NotNull(message = "category is obligatory")
    private ProjectCategory category;
}
