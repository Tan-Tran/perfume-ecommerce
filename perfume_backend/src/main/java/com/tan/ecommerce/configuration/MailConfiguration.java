package com.tan.ecommerce.configuration;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;


@Configuration
public class MailConfiguration {

    @Value("${spring.mail.host}")
    private String host;

    @Value("${spring.mail.username}")
    private String username;

    @Value("${spring.mail.password}")
    private String password;

    @Value("${spring.mail.port}")
    private int port;

//    @Value("${spring.mail.protocol}")
//    private String protocol;

//    @Value("${spring.mail.properties.mail.smtp.auth}")
//    private String auth;

//    @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
//    private String enable;
//
//    @Value("${mail.debug}")
//    private String debug;

    @Bean
    public JavaMailSender javaMailSender(){
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(host);
        javaMailSender.setPort(port);
        javaMailSender.setUsername(username);
        javaMailSender.setPassword(password);

//        Properties mailProperties = javaMailSender.getJavaMailProperties();
//        mailProperties.setProperty("mail.transport.protocol", protocol);
//        mailProperties.setProperty("mail.debug", debug);
//        mailProperties.setProperty("mail.smtp.auth", auth);
//        mailProperties.setProperty("mail.smtp.starttls.enable", enable);
        return javaMailSender;
    }

}
