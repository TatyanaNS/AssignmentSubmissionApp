package com.ua.assignmentsubmissionapp.model;

import lombok.Data;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Data
@ToString
@Entity
@Table(name = "authorities")
public class Authorities implements GrantedAuthority {

    private static final long serialVersionUID = 4065375140379002510L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(targetEntity = User.class)
    private transient User user;
    private String authority;

    public Authorities() {
    }

    public Authorities(String authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return authority;
    }
}