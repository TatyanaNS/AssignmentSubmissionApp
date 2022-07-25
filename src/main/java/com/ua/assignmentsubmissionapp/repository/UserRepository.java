package com.ua.assignmentsubmissionapp.repository;

import com.ua.assignmentsubmissionapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Query("select u from User  u " +
            "join u.authorities auth " +
            "where u.cohortStartDate is null or u.bootcampDurationInWeeks is null ")
    List<User> findAllInactiveBootcampStudents();
}