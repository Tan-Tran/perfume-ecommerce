package com.tan.ecommerce.service.impl;

import com.tan.ecommerce.domain.AppUser;
import com.tan.ecommerce.domain.Perfume;
import com.tan.ecommerce.domain.Review;
import com.tan.ecommerce.domain.Role;
import com.tan.ecommerce.dto.PasswordResetDto;
import com.tan.ecommerce.respository.AppUserRepository;
import com.tan.ecommerce.respository.PerfumeRepository;
import com.tan.ecommerce.respository.ReviewRepository;
import com.tan.ecommerce.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service("appUserServiceImpl")
public class AppUserServiceImpl implements AppUserService, UserDetailsService {

    private final AppUserRepository appUserRepository;

    private final PerfumeRepository perfumeRepository;

    private final ReviewRepository reviewRepository;

    private final PasswordEncoder passwordEncoder;

    private final MailSender mailSender;
    @Value("${hostname}")
    private String hostname;

    @Autowired
    public AppUserServiceImpl(AppUserRepository appUserRepository, PerfumeRepository perfumeRepository, ReviewRepository reviewRepository, PasswordEncoder passwordEncoder, MailSender mailSender) {
        this.appUserRepository = appUserRepository;
        this.perfumeRepository = perfumeRepository;
        this.reviewRepository = reviewRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, LockedException {
        AppUser user = appUserRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("Not found user: %s", username));
        }
        if (user.getActivationCode() != null) {
            throw new LockedException("email not activated");
        }
        return user;
    }

    @Override
    public AppUser findByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    @Override
    public boolean sendPasswordResetCode(String email) {
        AppUser user = appUserRepository.findByEmail(email);
        if (user == null) {
            return false;
        }
        user.setPasswordResetCode(UUID.randomUUID().toString());
        appUserRepository.save(user);

        String subject = "Password reset";
        List<String> emailMessages = new ArrayList<>();
        emailMessages.add("We have received a request to reset the password for your account.");
        emailMessages.add("To reset your password, follow this link ");
        sendMessage(user, emailMessages, subject, user.getPasswordResetCode(), "reset");
        return true;
    }

    @Override
    public void sendMessage(AppUser user, List<String> emailMessages, String subject, String code, String urlPart) {
        if (!ObjectUtils.isEmpty(user.getEmail())) {
            String message = String.format("Hello, %s! \n" + "%s \n" + "%s http://%s/%s/%s",
                    user.getUsername(),
                    emailMessages.get(0),
                    emailMessages.get(1),
                    hostname,
                    urlPart,
                    code);
            mailSender.send(user.getEmail(), subject, message);
        }
    }

    @Override
    public AppUser findByPasswordResetCode(String code) {
        return appUserRepository.findByPasswordResetCode(code);
    }

    @Override
    public void passwordReset(PasswordResetDto passwordResetDto) {
        AppUser user = appUserRepository.findByEmail(passwordResetDto.getEmail());
        user.setPassword(passwordEncoder.encode(passwordResetDto.getPassword()));
        user.setPasswordResetCode(null);
        appUserRepository.save(user);
    }

    @Override
    public boolean addUser(AppUser user) {
        AppUser userFromDB = appUserRepository.findByEmail(user.getEmail());

        if (userFromDB != null) {
            return false;
        }

        user.setActive(false);
        user.setRoles(Collections.singleton(Role.USER));
        user.setActivationCode(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        appUserRepository.save(user);

        String subject = "Active code";
        List<String> emailMessages = new ArrayList<>();
        emailMessages.add("Welcome to Perfume online store");
        emailMessages.add("Please follow the link");

        sendMessage(user, emailMessages, subject, user.getActivationCode(), "activate");
        return true;
    }

    @Override
    public boolean activeUser(String code) {
        AppUser user = appUserRepository.findByActivationCode(code);
        if (user == null) {
            return false;
        }

        user.setActivationCode(null);
        user.setActive(true);

        appUserRepository.save(user);
        return true;
    }

    @Override
    public void updateProfile(AppUser user, String password, String email) {
        String userEmail = user.getEmail();

        boolean isEmailChanged = (email != null && !email.equals(userEmail)) || (userEmail != null && !userEmail.equals(email));

        if (isEmailChanged) {
            user.setEmail(email);

            if (!ObjectUtils.isEmpty(email)) {
                user.setActivationCode(UUID.randomUUID().toString());
            }
        }

        if (!ObjectUtils.isEmpty(password)) {
            user.setPassword(passwordEncoder.encode(password));
        }

        appUserRepository.save(user);

    }

    @Override
    public void addReviewToPerfume(Review review, Long perfumeId) {
        Optional<Perfume> perfumeOptional = perfumeRepository.findById(perfumeId);
        if (perfumeOptional.isPresent()) {
            Review perfumeReview = new Review();
            perfumeReview.setAuthor(review.getAuthor());
            perfumeReview.setMessage(review.getMessage());
            perfumeReview.setDate(LocalDate.now());

            Perfume perfume = perfumeOptional.get();
            perfume.getReviews().add(perfumeReview);

            reviewRepository.save(perfumeReview);
        } else {
            throw new IllegalStateException(String.format("Not found perfume by id: %s", perfumeId));
        }
    }

    @Override
    public AppUser findUserById(Long id) {
        return appUserRepository.findById(id).orElseThrow(() -> new IllegalStateException(String.format("Not found user by id: %s", id)));
    }

    @Override
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

//    @Override
//    public void updateUser(String username, Map<String, String> form, AppUser user) {
//        System.out.println("username" + username);
//        System.out.println("form" + form);
//        System.out.println("user" + user);
//        user.setUsername(username);
//        Set<String> roles = Arrays.stream(Role.values()).map(Role::name).collect(Collectors.toSet());
//        user.getRoles().clear();
//
//        for (String key : form.keySet()) {
//            if (roles.contains(key)) {
//                user.getRoles().add(Role.valueOf(key));
//            }
//        }
//        appUserRepository.save(user);
//    }

    @Override
    public void updateUser(String username, String role, Long userId) {
        AppUser user = appUserRepository.findById(userId).get();
        user.setUsername(username);
        user.getRoles().clear();
        user.getRoles().add(Role.valueOf(role));
        appUserRepository.save(user);
    }

    @Override
    public void save(AppUser user) {
        appUserRepository.save(user);
    }
}
