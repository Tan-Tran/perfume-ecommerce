package com.tan.ecommerce.service;

import com.tan.ecommerce.domain.AppUser;
import com.tan.ecommerce.domain.Order;
import org.springframework.stereotype.Service;

import java.util.List;

public interface OrderService {
    List<Order> findOrderByUser(AppUser user);

    List<Order> findAllOrders();

    Order postOrder(Order order, AppUser user);


}
