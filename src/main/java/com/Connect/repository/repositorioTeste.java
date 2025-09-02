package com.Connect.repository;

import com.Connect.model.Colaborador;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class repositorioTeste{
    private Map<Long, Colaborador> colaboradores = new HashMap<>();
    private Long idCounter = 1L;

    public List<Colaborador> findAll() {
        return new ArrayList<>(colaboradores.values());
    }

    public Colaborador findById(Long id) {
        return colaboradores.get(id);
    }

    public Colaborador save(Colaborador colaborador) {
        if (colaborador.getId() == null) {
            colaborador.setId(idCounter++);
        }
        colaboradores.put(colaborador.getId(), colaborador);
        return colaborador;
    }

    public void delete(Long id) {
        colaboradores.remove(id);
    }
}
