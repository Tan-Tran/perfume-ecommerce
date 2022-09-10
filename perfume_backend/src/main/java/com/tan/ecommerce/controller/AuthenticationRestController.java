package com.tan.ecommerce.controller;


import com.tan.ecommerce.domain.AppUser;
import com.tan.ecommerce.domain.Perfume;
import com.tan.ecommerce.dto.AuthenticationRequestDTO;
import com.tan.ecommerce.dto.PasswordResetDto;
import com.tan.ecommerce.security.JwtProvider;
import com.tan.ecommerce.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/rest")
public class AuthenticationRestController {
    private final AuthenticationManager authenticationManager;
    private final AppUserService appUserService;
    private final JwtProvider jwtProvider;

    @Autowired
    public AuthenticationRestController(AuthenticationManager authenticationManager, AppUserService appUserService, JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.appUserService = appUserService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequestDTO request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            AppUser user = appUserService.findByEmail(request.getEmail());
            String userRole = user.getRoles().iterator().next().name();
            String token = jwtProvider.createToken(request.getEmail(), userRole);
            List<Perfume> perfumeList = user.getPerfumeList();

            Map<Object, Object> response = new HashMap<>();
            response.put("email", request.getEmail());
            response.put("token", token);
            response.put("userRole", userRole);
            response.put("perfumeList", perfumeList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (AuthenticationException exception) {
            return new ResponseEntity<>("Incorrect password or email", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody PasswordResetDto passwordResetDto) {
        System.out.println(passwordResetDto.getEmail());
        boolean forgotPassword = appUserService.sendPasswordResetCode(passwordResetDto.getEmail());
        if (!forgotPassword) {
            return new ResponseEntity<>("Email not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Reset password code is send to your E-mail", HttpStatus.OK);
    }


    @GetMapping("/reset/{code}")
    public ResponseEntity<?> getPasswordResetCode(@PathVariable String code) {
        AppUser user = appUserService.findByPasswordResetCode(code);
        if (user == null) {
            return new ResponseEntity<>("Password reset code is invalid!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/reset")
    public ResponseEntity<?> passwordReset(@RequestBody PasswordResetDto passwordResetDto) {
        Map<String, String> errors = new HashMap<>();
        boolean isEmptyPassword2 = ObjectUtils.isEmpty(passwordResetDto.getPassword2());
        boolean isPasswordDifferent =
                passwordResetDto.getPassword() != null
                        && !passwordResetDto.getPassword().equals(passwordResetDto.getPassword2());
        if (isEmptyPassword2) {
            errors.put("password2Error", "Password confirmation cannot be empty");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        if (isPasswordDifferent) {
            errors.put("passwordError", "Passwords do not match");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        appUserService.passwordReset(passwordResetDto);
        return new ResponseEntity<>("Password successfully changed!", HttpStatus.OK);
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler securityContextLogoutHandler = new SecurityContextLogoutHandler();
        securityContextLogoutHandler.logout(request, response, null);
    }

}
