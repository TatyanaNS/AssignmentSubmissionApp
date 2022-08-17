package com.ua.assignmentsubmissionapp.service;

import com.ua.assignmentsubmissionapp.model.User;
import com.ua.assignmentsubmissionapp.repository.AuthorityRepository;
import com.ua.assignmentsubmissionapp.repository.UserRepository;
import com.ua.assignmentsubmissionapp.util.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public Optional<User> findUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public User findUserByAuthorities(String authority) {
        return userRepo.findUserByAuthorities(authority);
    }

//    public void createUser(UserDto userDto) {
//        User newUser = new User();
//        newUser.setUsername(userDto.getUsername());
//        newUser.setName(userDto.getName());
//        String encodedPassword = customPasswordEncoder.getPasswordEncoder().encode(userDto.getPassword());
//        newUser.setPassword(encodedPassword);
//        userRepo.save(newUser);
//        Authority authority = new Authority();
//        authority.setAuthority("ROLE_STUDENT");
//        authority.setUser(newUser);
//        authorityRepo.save(authority);
//
//    }
}