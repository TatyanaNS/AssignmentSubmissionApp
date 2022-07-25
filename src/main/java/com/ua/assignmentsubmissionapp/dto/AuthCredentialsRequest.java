package com.ua.assignmentsubmissionapp.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class AuthCredentialsRequest {

    private String username;
    private String password;
}