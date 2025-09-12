package com.Connect.d;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Desabilita a proteção CSRF. É comum para APIs REST stateless.
                .csrf(AbstractHttpConfigurer::disable)

                // 2. Configura as regras de autorização de requisições.
                .authorizeHttpRequests(auth -> auth
                        // Permite que qualquer requisição (para qualquer endpoint) seja acessada sem autenticação.
                        .anyRequest().permitAll()
                )

                // 3. Define a política de gerenciamento de sessão como STATELESS.
                // O servidor не criará ou manterá sessões de usuário.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
