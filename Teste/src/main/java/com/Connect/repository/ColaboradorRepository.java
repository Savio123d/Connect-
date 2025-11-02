package com.Connect.repository;
import com.Connect.model.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Interface do repositório para a entidade Colaborador.
 * O Spring Data JPA criará automaticamente a implementação
 * com os métodos CRUD básicos (salvar, buscar, deletar, etc.).
 */
@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {
}

