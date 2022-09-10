package com.tan.ecommerce.controller;


import com.tan.ecommerce.service.PerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/rest")
public class MainRestController {

    private final PerfumeService perfumeService;

    @Autowired
    public MainRestController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts(){
        System.out.println("*********************Directory***************" + System.getProperty("user.dir"));
        return new ResponseEntity<>(perfumeService.getAllProducts(), HttpStatus.OK);
    }


    @GetMapping("/product/{id}")
    public ResponseEntity<?> getProduct(@PathVariable("id") Long id){
        return new ResponseEntity<>(perfumeService.findById(id), HttpStatus.OK);
    }
}
