package com.tan.ecommerce.controller;


import com.tan.ecommerce.domain.AppUser;
import com.tan.ecommerce.dto.CaptchaResponseDto;
import com.tan.ecommerce.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/rest")
public class RegistrationRestController {

    public static final String CAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";

    private final AppUserService appUserService;

    private final RestTemplate restTemplate;

    @Value("${recaptcha.secret}")
    private String secret;

    @Autowired
    public RegistrationRestController(AppUserService appUserService, RestTemplate restTemplate) {
        this.appUserService = appUserService;
        this.restTemplate = restTemplate;
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registration(
            @RequestParam("password2") String passwordConfirm,
            @RequestParam("g-recaptcha-response") String captcha,
            @Valid AppUser user,
            BindingResult bindingResult){
        String url = String.format(CAPTCHA_URL, secret, captcha);
        CaptchaResponseDto captchaResponseDto = restTemplate.postForObject(url, Collections.emptyList(), CaptchaResponseDto.class);

        boolean isPasswordConfirmEmpty = ObjectUtils.isEmpty(passwordConfirm);
        boolean isPasswordDifferent = user.getPassword() != null && !user.getPassword().equals(passwordConfirm);

        Map<String, String> errors = new HashMap<>();
        if(isPasswordConfirmEmpty){
            errors.put("password2Error", "Password confirmation cannot be empty");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        if(isPasswordDifferent){
            errors.put("passwordError", "Passwords do not match");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        if(bindingResult.hasErrors() || !captchaResponseDto.isSuccess()){
            Map<String, String> bindingResultErrors = ControllerUtils.getErrors(bindingResult);
            return new ResponseEntity<>(bindingResultErrors, HttpStatus.BAD_REQUEST);
        }

        if(!appUserService.addUser(user)){
            errors.put("emailError", "Email is already used");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        if(!captchaResponseDto.isSuccess()){
            errors.put("captchaError", "Fill captcha");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping("/activate/{code}")
    public ResponseEntity<?> activeEmailCode(@PathVariable("code") String code){
        boolean isActivated = appUserService.activeUser(code);

        if(!isActivated){
            return new ResponseEntity<>("Activation code not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("User successfully activated", HttpStatus.OK);
    }

}
