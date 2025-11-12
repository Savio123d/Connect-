// 1. Entidade Setor (baseado no Logico.png)
package com.Connect.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "setor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Setor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_setor")
    private Integer id; // Usando Integer para manter consistência com o Logico.png

    @Column(name = "nome_setor", nullable = false, unique = true, length = 100)
    private String nomeSetor;

    // Relacionamento inverso: Um setor pode ter muitos colaboradores
    @OneToMany(mappedBy = "setor", fetch = FetchType.LAZY)
    @JsonIgnore // Evita loops de serialização
    private Set<Colaborador> colaboradores;
}