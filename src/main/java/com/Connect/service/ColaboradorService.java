package com.Connect.service;

import com.Connect.model.Colaborador;
import com.Connect.repository.repositorioTeste;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ColaboradorService {

    private final repositorioTeste repository;

    public ColaboradorService(repositorioTeste repository) {
        this.repository = repository;
    }

    public List<Colaborador> listarTodos() {
        return repository.findAll();
    }

    public Colaborador buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Colaborador salvar(Colaborador colaborador) {
        return repository.save(colaborador);
    }

    public void deletar(Long id) {
        repository.delete(id);
    }
}
