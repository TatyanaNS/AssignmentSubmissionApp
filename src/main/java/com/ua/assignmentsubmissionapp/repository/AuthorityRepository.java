package com.ua.assignmentsubmissionapp.repository;

import com.ua.assignmentsubmissionapp.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Long> {
}