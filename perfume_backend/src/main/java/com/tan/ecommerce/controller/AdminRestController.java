package com.tan.ecommerce.controller;


import com.tan.ecommerce.domain.AppUser;
import com.tan.ecommerce.domain.Perfume;
import com.tan.ecommerce.service.AppUserService;
import com.tan.ecommerce.service.OrderService;
import com.tan.ecommerce.service.PerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/rest")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminRestController {

    private final PerfumeService perfumeService;

    private final OrderService orderService;

    private final AppUserService appUserService;

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    public AdminRestController(PerfumeService perfumeService, OrderService orderService, AppUserService appUserService) {
        this.perfumeService = perfumeService;
        this.orderService = orderService;
        this.appUserService = appUserService;
    }

    @PostMapping("/admin/add")
    public ResponseEntity<?> addPerfume(
            @Valid Perfume perfume,
            BindingResult bindingResult,
            @RequestParam(name = "file", required = false) MultipartFile file) throws IOException {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);
            return new ResponseEntity<>(errorsMap, HttpStatus.BAD_REQUEST);
        }
        saveFile(perfume, file);
        Perfume perfumeAfterSave = perfumeService.save(perfume);
        return new ResponseEntity<>(perfumeAfterSave, HttpStatus.OK);
    }

    @PutMapping("/admin/edit")
    public ResponseEntity<?> updatePerfume(
            @Valid Perfume perfumeDomain,
            @RequestParam(name="perfumer") String perfumer,
            BindingResult bindingResult,
            @RequestParam(name = "file", required = false) MultipartFile file
    ) throws IOException {
        perfumeDomain.setPerfume(perfumer);
        if (bindingResult.hasErrors()) {
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);
            return new ResponseEntity<>(errorsMap, HttpStatus.BAD_REQUEST);
        }
        if(file != null){
            saveFile(perfumeDomain, file);
        }
        perfumeService.save(perfumeDomain);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/admin/orders")
    public ResponseEntity<?> getAllOrders() {
        return new ResponseEntity<>(orderService.findAllOrders(), HttpStatus.OK);
    }

    @GetMapping("/admin/user/{id}")
    public ResponseEntity<?> getUser(
            @PathVariable("id") Long userid
    ) {
        return new ResponseEntity<>(appUserService.findUserById(userid), HttpStatus.OK);
    }

    @GetMapping("/admin/user/all")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(appUserService.getAllUsers(), HttpStatus.OK);
    }

//    @PutMapping("/admin/user/edit")
//    public ResponseEntity<?> updateUser(
//            @RequestParam("username") String username,
//            @RequestParam Map<String, String> form,
//            @RequestParam("user") AppUser user
//            ) {
//        appUserService.updateUser(username, form, user);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @PutMapping("/admin/user/edit")
    public ResponseEntity<?> updateUser(
            @RequestParam("username") String username,
            @RequestParam ("role") String role,
            @RequestParam("userId") Long userId
    ) {
        appUserService.updateUser(username, role, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    private void saveFile(Perfume perfume, @RequestParam("file") MultipartFile file) throws IOException {
        if (file == null) {
            perfume.setFilename("empty.jpg");
        } else {
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFilename = uuidFile + "." + file.getOriginalFilename();

            file.transferTo(new File(uploadPath + "/" + resultFilename));
            perfume.setFilename(resultFilename);
        }
    }
}
