package com.tan.ecommerce.controller;


import com.tan.ecommerce.domain.AppUser;
import com.tan.ecommerce.domain.Order;
import com.tan.ecommerce.domain.Perfume;
import com.tan.ecommerce.service.AppUserService;
import com.tan.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/rest")
public class OrderRestController {

    private final AppUserService appUserService;

    private final OrderService orderService;


    @Autowired
    public OrderRestController(AppUserService appUserService, OrderService orderService) {
        this.appUserService = appUserService;
        this.orderService = orderService;
    }

    @GetMapping("/order")
    public ResponseEntity<?> getOrder(@AuthenticationPrincipal AppUser userSession) {
        AppUser user = appUserService.findByEmail(userSession.getEmail());
        List<Perfume> perfumeList = user.getPerfumeList();
        return new ResponseEntity<>(perfumeList, HttpStatus.OK);
    }

    @PostMapping("/order")
    public ResponseEntity<?> order(
            @AuthenticationPrincipal AppUser userSession,
            @Valid @RequestBody Order order,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);
            return new ResponseEntity<>(errorsMap, HttpStatus.BAD_REQUEST);
        }
        Order orderDB = orderService.postOrder(order, userSession);
        return new ResponseEntity<>(orderDB, HttpStatus.OK);
    }


    @GetMapping("/order/finalize")
    public ResponseEntity<?> finalizeOrder() {
        List<Order> orders = orderService.findAllOrders();
        Order order = orders.get(orders.size() - 1);
        return new ResponseEntity<>(order.getId(), HttpStatus.OK);
    }

    @GetMapping("/order/list")
    public ResponseEntity<?> getUserOrderList(@AuthenticationPrincipal AppUser userSession) {
        AppUser user = appUserService.findByEmail(userSession.getEmail());
        List<Order> orders = orderService.findOrderByUser(user);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
