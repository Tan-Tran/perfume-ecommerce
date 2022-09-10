package com.tan.ecommerce.controller;

import com.tan.ecommerce.domain.AppUser;
import com.tan.ecommerce.domain.Review;
import com.tan.ecommerce.dto.AuthenticationRequestDTO;
import com.tan.ecommerce.service.AppUserService;
import com.tan.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/rest")
public class UserRestController {

    private final AppUserService appUserService;

    private final OrderService orderService;

    @Autowired
    public UserRestController(AppUserService appUserService, OrderService orderService) {
        this.appUserService = appUserService;
        this.orderService = orderService;
    }

    @GetMapping("/user/edit")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal AppUser userSession) {
        AppUser user = appUserService.findByEmail(userSession.getEmail());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/user/edit")
    public ResponseEntity<?> updateUserInfo(
            @AuthenticationPrincipal AppUser userSession,
            @RequestBody AuthenticationRequestDTO authenticationRequestDTO) {
        appUserService.updateProfile(userSession, authenticationRequestDTO.getPassword(), authenticationRequestDTO.getEmail());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/orders")
    public ResponseEntity<?> getAllOrdersOfUser(@AuthenticationPrincipal AppUser userSession){
        AppUser user = appUserService.findByEmail(userSession.getEmail());
        return new ResponseEntity<>(orderService.findOrderByUser(user), HttpStatus.OK);
    }

    @PostMapping("/user/review")
    public ResponseEntity<?> addReviewToPerfume(
            @RequestParam(required = false, name = "perfumeId") Long perfumeId,
            @Valid Review review,
            BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);
            return new ResponseEntity<>(errorsMap, HttpStatus.BAD_REQUEST);
        }
        appUserService.addReviewToPerfume(review, perfumeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
