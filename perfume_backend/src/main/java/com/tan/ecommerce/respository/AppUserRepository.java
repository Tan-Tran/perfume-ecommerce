package com.tan.ecommerce.respository;

import com.tan.ecommerce.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByEmail(String email);

    AppUser findByUsername(String username);

    AppUser findByActivationCode(String code);

    AppUser findByPasswordResetCode(String code);
}
