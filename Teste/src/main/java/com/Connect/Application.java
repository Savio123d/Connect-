package com.Connect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.Connect.repository") // Diz explicitamente onde estão os repositórios
@EntityScan("com.Connect.model")              // Diz explicitamente onde estão as entidades
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}



