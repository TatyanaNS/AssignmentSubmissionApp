package com.ua.assignmentsubmissionapp.service;

import com.ua.assignmentsubmissionapp.model.Assignment;
import com.ua.assignmentsubmissionapp.model.User;
import com.ua.assignmentsubmissionapp.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment save(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus("Needs to be Submitted");
        assignment.setUser(user);

        return assignmentRepository.save(assignment);
    }

    public Set<Assignment> findByUser(User user) {
//        boolean hasCodeReviewerRole = user.getAuthorities().stream()
//                .filter(auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority())).count() > 0;
//        if (hasCodeReviewerRole) {
//            // load assignments if you're a code reviewer role
//            return assignmentRepo.findByCodeReviewer(user);
//        } else {
//            // load assignments if you're a student role
//            return assignmentRepo.findByUser(user);
//        }
        return assignmentRepository.findByUser(user);
    }
}