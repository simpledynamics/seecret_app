package net.seecret;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Simple Spring Boot wrapper for running the Seecret Web Site
 *
 */
@SpringBootApplication 
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Controller
    public static class IndexController {
    	@RequestMapping("/")
    	public String index() {
    		return "index";
    	}
    }
    
}