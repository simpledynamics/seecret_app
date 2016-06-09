package net.seecret;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Simple Spring Boot wrapper for running the Seecret Web Site
 *
 */
@SpringBootApplication 
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}