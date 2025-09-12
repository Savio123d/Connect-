package com.Connect.controller;

import com.Connect.model.Colaborador;
import com.Connect.service.ColaboradorService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/colaboradores")
// Adicionado para permitir requisições do frontend que roda em localhost:3232
@CrossOrigin(origins = "http://localhost:3232")
public class ColaboradorController {

    private final ColaboradorService service;

    public ColaboradorController(ColaboradorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Colaborador> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Colaborador buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public Colaborador criar(@RequestBody Colaborador colaborador) {
        return service.salvar(colaborador);
    }

    @PutMapping("/{id}")
    public Colaborador atualizar(@PathVariable Long id, @RequestBody Colaborador colaborador) {
        // Garante que estamos atualizando o colaborador com o ID correto
        colaborador.setId(id);
        return service.salvar(colaborador);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
