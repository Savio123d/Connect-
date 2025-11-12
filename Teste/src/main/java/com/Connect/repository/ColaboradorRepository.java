package com.Connect.repository;
import com.Connect.model.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // <-- IMPORT NECESSÁRIO
import org.springframework.stereotype.Repository;

import java.util.List; // <-- IMPORT NECESSÁRIO
import java.util.Optional;

/**
 * Interface do repositório para a entidade Colaborador.
 * O Spring Data JPA criará automaticamente a implementação
 * com os métodos CRUD básicos (salvar, buscar, deletar, etc.).
 */
@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {

    /**
     * Adicionado método para buscar um colaborador pelo email.
     * Será útil para implementar um endpoint de login seguro no futuro.
     */
    Optional<Colaborador> findByEmail(String email);

    // --- CORREÇÃO DE PERFORMANCE (LazyInitializationException) ---
    /**
     * Substitui o `findAll()` padrão.
     * Esta query força o Hibernate a buscar os Colaboradores E
     * fazer o JOIN com os Setores na mesma consulta, resolvendo o problema
     * de `FetchType.LAZY` no service.
     */
    @Query("SELECT c FROM Colaborador c LEFT JOIN FETCH c.setor")
    List<Colaborador> findAllWithSetor();
}