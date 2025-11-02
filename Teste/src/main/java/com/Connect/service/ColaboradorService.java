package com.Connect.service;

import com.Connect.model.Colaborador;
import com.Connect.repository.ColaboradorRepository; // Import alterado
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ColaboradorService {

    // Injetando o repositório JPA real
    private final ColaboradorRepository repository;

    public ColaboradorService(ColaboradorRepository repository) {
        this.repository = repository;
    }

    public List<Colaborador> listarTodos() {
        return repository.findAll();
    }

    public Colaborador buscarPorId(Long id) {
        // O método findById do JpaRepository retorna um Optional
        // Usamos orElse(null) para retornar o colaborador se existir, ou null se não.
        return repository.findById(id).orElse(null);
    }

    public Colaborador salvar(Colaborador colaborador) {
        return repository.save(colaborador);
    }

    public void deletar(Long id) {
        // Usando o método padrão do JpaRepository
        repository.deleteById(id);
    }
}

