package com.ua.assignmentsubmissionapp.web;

import com.ua.assignmentsubmissionapp.enums.AssignmentResponseDto;
import com.ua.assignmentsubmissionapp.enums.AuthorityEnum;
import com.ua.assignmentsubmissionapp.model.Assignment;
import com.ua.assignmentsubmissionapp.model.User;
import com.ua.assignmentsubmissionapp.service.AssignmentService;
import com.ua.assignmentsubmissionapp.service.UserService;
import com.ua.assignmentsubmissionapp.util.AuthorityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.save(user);
        return ResponseEntity.ok(newAssignment);
    }

    @GetMapping("")
    public ResponseEntity<?> getAssignment(@AuthenticationPrincipal User user) {
        Set<Assignment> assignmentsByUser = assignmentService.findByUser(user);
        return ResponseEntity.ok(assignmentsByUser);
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId) {
        Optional <Assignment> assignmentOpt = assignmentService.findById(assignmentId);
        AssignmentResponseDto response = new AssignmentResponseDto(assignmentOpt.orElse(new Assignment()));
        return ResponseEntity.ok(response);
    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignment(@PathVariable Long assignmentId,
                                              @RequestBody Assignment assignment,
                                              @AuthenticationPrincipal User user) {
        // add the code reviewer to this assignment if it was claimed
        if (assignment.getCodeReviewer() != null) {
            User codeReviewer = assignment.getCodeReviewer();
            codeReviewer = userService.findUserByUsername(codeReviewer.getUsername()).orElseThrow();

            if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(), codeReviewer)) {
                assignment.setCodeReviewer(codeReviewer);
            }
        } else {
            User codeReviewer = userService.findUserByAuthorities(AuthorityEnum.ROLE_CODE_REVIEWER.name());
            System.out.println("codeReviewer is null: " + codeReviewer);
            assignment.setCodeReviewer(codeReviewer);
        }
        System.out.println("codeReviewer: " + assignment.getCodeReviewer());
        Assignment updatedAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(updatedAssignment);
    }
}