package com.ua.assignmentsubmissionapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Data
@ToString
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnore
    @ManyToOne
    private Assignment assignment;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;
    private ZonedDateTime createdDate;
    @Column(columnDefinition = "TEXT")
    private String text;
}