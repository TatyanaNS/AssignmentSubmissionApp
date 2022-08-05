package com.ua.assignmentsubmissionapp;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


public class PasswordEncoderTest {

    @Test
    public void encode_password () {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println("Admin password: " +  passwordEncoder.encode("admin-123"));
        System.out.println("Code reviewer password: " +  passwordEncoder.encode("mentor-123"));
    }
}