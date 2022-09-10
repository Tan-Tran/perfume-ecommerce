package com.tan.ecommerce.service.impl;


import com.tan.ecommerce.domain.AppUser;
import com.tan.ecommerce.domain.Order;
import com.tan.ecommerce.respository.AppUserRepository;
import com.tan.ecommerce.respository.OrderRepository;
import com.tan.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private final AppUserRepository appUserRepository;

    private final MailSender mailSender;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, AppUserRepository appUserRepository, MailSender mailSender) {
        this.orderRepository = orderRepository;
        this.appUserRepository = appUserRepository;
        this.mailSender = mailSender;
    }

    @Override
    public List<Order> findOrderByUser(AppUser user) {
        return orderRepository.findOrderByUser(user);
    }

    @Override
    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order postOrder(Order order, AppUser userSession) {
        AppUser user = appUserRepository.findByEmail(userSession.getEmail());

        Order newOrder = new Order(user);
        newOrder.getPerfumeList().addAll(order.getPerfumeList());
        newOrder.setTotalPrice(order.getTotalPrice());
        newOrder.setFirstName(order.getFirstName());
        newOrder.setLastName(order.getLastName());
        newOrder.setCity(order.getCity());
        newOrder.setAddress(order.getAddress());
        newOrder.setPostIndex(order.getPostIndex());
        newOrder.setEmail(order.getEmail());
        newOrder.setPhoneNumber(order.getPhoneNumber());

        user.getPerfumeList().clear();

        orderRepository.save(newOrder);

        StringBuilder perfumes = new StringBuilder();
        newOrder.getPerfumeList().forEach((perfume -> {
            perfumes.append(perfume.getPerfume());
            perfumes.append(" ");
            perfumes.append(perfume.getPerfumeTitle());
            perfumes.append(" — $");
            perfumes.append(perfume.getPrice());
            perfumes.append(".00");
            perfumes.append("\n");
        }));

        String subject = "Order #" + newOrder.getId();
        String message = "Hello " + order.getFirstName() + "!\n" +
                "Thank you for your order in Perfume online store.\n" +
                "Your order number is " + newOrder.getId() + "\n" +
                "Date: " + newOrder.getDate() + "\n" +
                "Name: " + order.getFirstName() + " " + order.getLastName() + "\n" +
                "Address: " + order.getCity() + ", " + order.getAddress() + "\n" +
                "Post index: " + order.getPostIndex() + "\n" +
                "Phone: " + order.getPhoneNumber() + "\n" +
                "Perfumes: " + "\n" + perfumes + "\n" +
                "Total price: $" + order.getTotalPrice();
        mailSender.send(order.getEmail(), subject, message);
        return order;
    }

}
