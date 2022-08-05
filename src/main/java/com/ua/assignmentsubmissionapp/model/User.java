package com.ua.assignmentsubmissionapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@ToString
@Entity
@Table(name = "users")
public class User implements UserDetails {
    private static final long serialVersionUID = 1840361243951715062L;
    @Id
    private Long id;
    private String username;
    @JsonIgnore
    private String password;
//    @ManyToOne(fetch = FetchType.EAGER)
    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private Set<Authorities> authorities = new HashSet<>();
    private LocalDate cohortStartDate;
    private Integer bootcampDurationInWeeks;

    @Override
    public Set<Authorities> getAuthorities() {
        return authorities;
    }

//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        List<GrantedAuthority> roles = new ArrayList<>();
//        roles.add(new Authorities("ROLE_STUDENT"));
//        return roles;
//    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}