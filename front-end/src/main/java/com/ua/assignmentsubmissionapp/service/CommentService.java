package com.ua.assignmentsubmissionapp.service;

import com.ua.assignmentsubmissionapp.dto.CommentDto;
import com.ua.assignmentsubmissionapp.model.*;
import com.ua.assignmentsubmissionapp.repository.AssignmentRepository;
import com.ua.assignmentsubmissionapp.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Set;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepo;
    @Autowired
    private AssignmentRepository assignmentRepo;

    public CommentService(CommentRepository commentRepo, AssignmentRepository assignmentRepo) {
        this.commentRepo = commentRepo;
        this.assignmentRepo = assignmentRepo;
    }

    public Comment save(CommentDto commentDto, User user) {
        Comment comment = new Comment();
        comment.setId(commentDto.getId());
        comment.setText(commentDto.getText());
        comment.setCreatedBy(user);
        Assignment assignment = assignmentRepo.getById(commentDto.getAssignmentId());
        comment.setAssignment(assignment);
        if (comment.getId() == null) {
            comment.setCreatedDate(ZonedDateTime.now());
        } else {
            comment.setCreatedDate(commentDto.getCreatedDate());
        }
        return commentRepo.save(comment);
    }

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {
        return commentRepo.findByAssignmentId(assignmentId);
    }

    public void delete(Long commentId) {
        commentRepo.deleteById(commentId);
    }
}