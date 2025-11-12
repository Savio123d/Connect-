package com.Connect.controller;

import com.Connect.dto.ColaboradorRequestDTO;
import com.Connect.dto.ColaboradorResponseDTO;
import com.Connect.service.ColaboradorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/colaboradores")
// O @CrossOrigin foi removido daqui, pois agora é tratado globalmente no SecurityConfig
public class ColaboradorController {

    private final ColaboradorService service;

    public ColaboradorController(ColaboradorService service) {
        this.service = service;
    }

    /**
     * Endpoint GET /api/colaboradores
     * Lista todos os colaboradores.
     * Retorna DTOs de Resposta (sem senha).
     */
    @GetMapping
    public ResponseEntity<List<ColaboradorResponseDTO>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    /**
     * Endpoint GET /api/colaboradores/{id}
     * Busca um colaborador por ID.
     * Retorna DTO de Resposta (sem senha).
     */
    @GetMapping("/{id}")
    public ResponseEntity<ColaboradorResponseDTO> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.buscarPorId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Retorna 404 se não encontrar
        }
    }

    /**
     * Endpoint POST /api/colaboradores
     * Cria um novo colaborador (usado pelo register.jsx).
     * Recebe um DTO de Requisição (com senha).
     * Retorna 201 Created e um DTO de Resposta (sem senha).
     */
    @PostMapping
    public ResponseEntity<?> criar(@RequestBody ColaboradorRequestDTO dto) {
        try {
            System.out.println("[v0] Recebendo requisição de registro: " + dto.getEmail());
            ColaboradorResponseDTO colaboradorSalvo = service.salvar(dto);
            System.out.println("[v0] Colaborador criado com sucesso: " + colaboradorSalvo.getId());

            // Retorna o status 201 Created com a localização do novo recurso
            URI location = URI.create("/api/colaboradores/" + colaboradorSalvo.getId());
            return ResponseEntity.created(location).body(colaboradorSalvo);
        } catch (RuntimeException e) {
            System.err.println("[v0] Erro ao criar colaborador: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    /**
     * Endpoint PUT /api/colaboradores/{id}
     * Atualiza um colaborador existente.
     * Recebe um DTO de Requisição.
     * Retorna 200 OK e um DTO de Resposta (sem senha).
     */
    @PutMapping("/{id}")
    public ResponseEntity<ColaboradorResponseDTO> atualizar(@PathVariable Long id, @RequestBody ColaboradorRequestDTO dto) {
        try {
            return ResponseEntity.ok(service.atualizar(id, dto));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Retorna 404 se não encontrar
        }
    }

    /**
     * Endpoint DELETE /api/colaboradores/{id}
     * Deleta um colaborador.
     * Retorna 204 No Content.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            service.deletar(id);
            return ResponseEntity.noContent().build(); // Retorna 204
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Retorna 404 se não encontrar
        }
    }

    private record ErrorResponse(String message) {}
}
