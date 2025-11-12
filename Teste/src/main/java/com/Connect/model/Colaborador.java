// Refatorado para usar @ManyToOne com Setor
package com.Connect.model;

import com.Connect.Utilidades.TelefoneUtil;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "colaborador")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Colaborador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_colaborador")
    private Long id;

    // --- RELACIONAMENTO CORRIGIDO ---
    // Em vez de "Integer idSetor", agora é um relacionamento
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_setor") // Nome da coluna FK no Logico.png
    private Setor setor;
    // --- FIM DA CORREÇÃO ---

    @Column(name = "id_gerente")
    private Integer idGerente; // (Manteremos este como Integer por enquanto)

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "senha", nullable = false)
    private String senha;

    @Column(name = "cargo")
    private String cargo;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "foto_perfil_url")
    private String fotoPerfilUrl;

    @Column(name = "cpf", unique = true)
    private String cpf;

    @Column(name = "nivel")
    private String nivel;

    public String getTelefone() {
        return TelefoneUtil.formatar(this.telefone);
    }
}