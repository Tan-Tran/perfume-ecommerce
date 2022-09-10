package com.tan.ecommerce.respository;

import com.tan.ecommerce.domain.AppUser;
import com.tan.ecommerce.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findOrderByUser(AppUser user);
}
