package com.tan.ecommerce.service;

import com.tan.ecommerce.domain.AppUser;
import com.tan.ecommerce.domain.Review;
import com.tan.ecommerce.dto.PasswordResetDto;
import org.springframework.security.core.AuthenticatedPrincipal;

import java.util.List;
import java.util.Map;

public interface AppUserService {

    AppUser findByEmail(String email);

    boolean sendPasswordResetCode(String email);

    void sendMessage(AppUser user, List<String> emailMessages, String subject, String code, String urlPart);

    AppUser findByPasswordResetCode(String code);

    void passwordReset(PasswordResetDto passwordResetDto);

    boolean addUser(AppUser user);

    boolean activeUser(String code);

    void updateProfile(AppUser user, String password, String email);

    void addReviewToPerfume(Review review, Long perfumeId);

    AppUser findUserById(Long id);

    List<AppUser> getAllUsers();

//    void updateUser(String username, Map<String, String> form, AppUser user);

    void updateUser(String username, String role, Long userId);

    void save(AppUser user);
}
