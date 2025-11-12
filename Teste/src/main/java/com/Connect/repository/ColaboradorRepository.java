package com.Connect.repository;
import com.Connect.model.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional; // É NECESSÁRIO ADICIONAR ESTE IMPORT

/**
 * Interface do repositório para a entidade Colaborador.
 * O Spring Data JPA criará automaticamente a implementação
 * com os métodos CRUD básicos (salvar, buscar, deletar, etc.).
 */
@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {

    /**
     * MÉTODO ADICIONADO: Busca um colaborador pelo email.
     * Essencial para o método de login no serviço.
     */
    Optional<Colaborador> findByEmail(String email);
}