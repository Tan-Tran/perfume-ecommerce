package com.tan.ecommerce.configuration;


import com.tan.ecommerce.security.JwtConfigurer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JwtConfigurer jwtConfigurer;

    @Autowired
    public WebSecurityConfiguration(JwtConfigurer jwtConfigurer) {
        this.jwtConfigurer = jwtConfigurer;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeHttpRequests()
                .antMatchers("/api/v1/rest",
                        "/api/v1/rest/product/*",
                        "/api/v1/rest/admin/*",
                        "/api/v1/rest/admin/user/*",
                        "/api/v1/rest/registration",
                        "/api/v1/rest/forgot",
                        "/api/v1/rest/reset/**",
                        "/api/v1/rest/activate/*",
                        "/api/v1/rest/menu/**",
                        "/api/v1/rest/cart",
                        "/api/v1/rest/cart/*",
                        "/api/v1/rest/order",
                        "/api/v1/rest/order/*",
                        "/api/v1/rest/user/*",
                        "/img/**",
                        "/static/**",
                        "/activate/*",
                        "/menu/**").permitAll()
                .antMatchers("/api/v1/rest/login").permitAll()
                .anyRequest()
                .authenticated();
        http.apply(jwtConfigurer);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}

