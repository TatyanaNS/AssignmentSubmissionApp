package com.ua.assignmentsubmissionapp.filter;

import com.ua.assignmentsubmissionapp.repository.UserRepository;
import com.ua.assignmentsubmissionapp.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.util.StringUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

//        if (req.getCookies() == null) {
//            chain.doFilter(req, res);
//            return;
//        }
//        // Get authorization header and validate
//        Optional<Cookie> jwtOpt = Arrays.stream(req.getCookies())
//                .filter(cookie -> "jwt".equals(cookie.getName()))
//                .findAny();
//
//        if (jwtOpt.isEmpty()) {
//            chain.doFilter(req, res);
//            return;
//        }
//
//        String token = jwtOpt.get().getValue();
//        UserDetails userDetails = null;
//        try {
//                userDetails = userRepository.findByUsername(jwtUtil.getUsernameFromToken(token))
//                    .orElse(null);
//        } catch (ExpiredJwtException | SignatureException e) {
//            chain.doFilter(req, res);
//            return;
//        }
//
//        // Get jwt token and validate
//        if (!jwtUtil.validateToken(token, userDetails)) {
//            chain.doFilter(req, res);
//            return;
//        }

        // Get authorisation header and validate
        final String header = req.getHeader(HttpHeaders.AUTHORIZATION);
        if (!StringUtils.hasText(header) || (StringUtils.hasText(header) && !header.startsWith("Bearer "))) {
            chain.doFilter(req, res);
            return;
        }
        final String token = header.split(" ")[1].trim();

        // Get user identity and set in on the spring security context
        UserDetails userDetails = userRepository.findByUsername(jwtUtil.getUsernameFromToken(token))
                .orElse(null);

        // Get jwt token and validate
        if (!jwtUtil.validateToken(token, userDetails)) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null,
                userDetails == null ?
                        List.of() : userDetails.getAuthorities());

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }
}