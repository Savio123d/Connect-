package com.Connect.controller;

import com.Connect.dto.LoginRequestDTO;
import com.Connect.dto.ColaboradorResponseDTO;
import com.Connect.service.ColaboradorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller dedicado para autenticação.
 * Mantém o ColaboradorController focado no CRUD.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final ColaboradorService colaboradorService;

    public AuthController(ColaboradorService colaboradorService) {
        this.colaboradorService = colaboradorService;
    }

    /**
     * Endpoint POST /api/auth/login
     * Recebe email e senha, valida no serviço e retorna o DTO do usuário (sem senha).
     */
    @PostMapping("/login")
    public ResponseEntity<ColaboradorResponseDTO> login(@RequestBody LoginRequestDTO dto) {
        try {
            ColaboradorResponseDTO response = colaboradorService.login(dto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // Retorna 401 Unauthorized (Não autorizado) se as credenciais forem inválidas
            return ResponseEntity.status(401).body(null);
        }
    }
}