package com.tan.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EcommerceApplication {

    public static void main(String[] args) {
        System.out.println("*********************Directory***************" + System.getProperty("user.dir"));
        SpringApplication.run(EcommerceApplication.class, args);
    }

}
