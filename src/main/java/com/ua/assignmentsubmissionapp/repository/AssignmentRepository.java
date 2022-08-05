package com.ua.assignmentsubmissionapp.repository;

import com.ua.assignmentsubmissionapp.model.Assignment;
import com.ua.assignmentsubmissionapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    @Query("select a from Assignment a where a.user = :user ORDER BY a.id")
    Set<Assignment> findByUser(User user);

    @Query("select a from Assignment a "
            + "where a.status = 'Submitted'" +
            " or a.codeReviewer = :codeReviewer")
    Set<Assignment> findByCodeReviewer(User codeReviewer);

//    @Query("select a from Assignment a "
//            + "where (a.status = 'submitted' and (a.codeReviewer is null or a.codeReviewer = :codeReviewer))"
//            + "or a.codeReviewer = :codeReviewer")
//    Set<Assignment> findByCodeReviewer(User codeReviewer);

//    @Query("select a from Assignment a " +
//            "join fetch a.user u " +
//            "where u.cohortStartDate is not null and u.bootcampDurationInWeeks is not null")
//    List<Assignment> findAllActiveBootcampStudents();
}