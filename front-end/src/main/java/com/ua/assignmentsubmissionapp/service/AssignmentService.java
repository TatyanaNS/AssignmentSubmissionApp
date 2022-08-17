package com.ua.assignmentsubmissionapp.service;

import com.ua.assignmentsubmissionapp.enums.AssignmentStatusEnum;
import com.ua.assignmentsubmissionapp.enums.AuthorityEnum;
import com.ua.assignmentsubmissionapp.model.Assignment;
import com.ua.assignmentsubmissionapp.model.User;
import com.ua.assignmentsubmissionapp.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment save(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        assignment.setNumber(findNextAssignmentToSubmit(user));
        assignment.setUser(user);

        return assignmentRepository.save(assignment);
    }

    private Integer findNextAssignmentToSubmit(User user) {
        Set<Assignment> assignmentsByUser = assignmentRepository.findByUser(user);
        if (assignmentsByUser == null) {
            return 1;
        }
        Optional<Integer> nextAssignmentNumOpt = assignmentsByUser.stream()
                .sorted((a1, a2) -> {
                    if (a1.getNumber() == null) return 1;
                    if (a2.getNumber() == null) return 1;
                    return a2.getNumber().compareTo(a1.getNumber());
                }).map(assignment -> {
                    if (assignment.getNumber() == null) return 1;
                    return assignment.getNumber() + 1;
                }).findFirst();
        return nextAssignmentNumOpt.orElse(1);
    }

    public Set<Assignment> findByUser(User user) {
        boolean hasCodeReviewerRole = user.getAuthorities().stream()
                .filter(auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name()
                        .equals(auth.getAuthority())).count() > 0;
        System.out.println("hasCodeReviewerRole: " + hasCodeReviewerRole);
        if (hasCodeReviewerRole) {
            // load assignments if you're a code reviewer role
            return assignmentRepository.findByCodeReviewer(user);
        } else {
            // load assignments if you're a student role
            return assignmentRepository.findByUser(user);
        }
    }

    public Optional<Assignment> findById(Long assignmentId) {
        return assignmentRepository.findById(assignmentId);
    }

    public Assignment save(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }
}