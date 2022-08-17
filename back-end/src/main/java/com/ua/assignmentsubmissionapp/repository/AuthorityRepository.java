package com.ua.assignmentsubmissionapp.repository;

import com.ua.assignmentsubmissionapp.model.Authorities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface AuthorityRepository extends JpaRepository<Authorities, Long> {
}