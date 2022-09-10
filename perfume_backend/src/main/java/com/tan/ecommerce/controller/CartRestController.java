package com.tan.ecommerce.controller;


import com.tan.ecommerce.domain.AppUser;
import com.tan.ecommerce.domain.Perfume;
import com.tan.ecommerce.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rest")
public class CartRestController {

    private final AppUserService appUserService;

    @Autowired
    public CartRestController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/cart/{email}")
    public ResponseEntity<?> getCart(@PathVariable("email") String email) {
        AppUser user = appUserService.findByEmail(email);
        List<Perfume> perfumeList = user.getPerfumeList();

        return new ResponseEntity<>(perfumeList, HttpStatus.OK);
    }

    @PostMapping("/cart/add")
    public ResponseEntity<?> addToCart(@RequestBody Perfume perfume, @AuthenticationPrincipal AppUser userSession) {
        AppUser user = appUserService.findByEmail(userSession.getEmail());
        user.getPerfumeList().add(perfume);

        appUserService.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/cart/remove")
    public ResponseEntity<?> removeFromCart(@RequestBody Perfume perfume, @AuthenticationPrincipal AppUser userSession) {
        AppUser user = appUserService.findByEmail(userSession.getEmail());
        user.getPerfumeList().remove(perfume);

        appUserService.save(user);
        List<Perfume> perfumeList = user.getPerfumeList();

        return new ResponseEntity<>(perfumeList, HttpStatus.OK);
    }


}
