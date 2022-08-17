package com.ua.assignmentsubmissionapp.enums;

import com.ua.assignmentsubmissionapp.model.Assignment;
import lombok.*;

@Data
@ToString
public class AssignmentResponseDto {

    private Assignment assignment;
    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();

    public AssignmentResponseDto(Assignment assignment) {
        super();
        this.assignment = assignment;
    }
}