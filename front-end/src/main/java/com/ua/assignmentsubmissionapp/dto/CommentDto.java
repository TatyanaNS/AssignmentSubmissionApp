package com.ua.assignmentsubmissionapp.dto;

import lombok.Data;
import lombok.ToString;

import java.time.ZonedDateTime;

@Data
@ToString
public class CommentDto {

    private Long id;
    private Long assignmentId;
    private String text;
    private String user;
    private ZonedDateTime createdDate;
}