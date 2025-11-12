// Refatorado para enviar o objeto SetorDTO aninhado
package com.Connect.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColaboradorResponseDTO {

    private Long id;
    private String nome;
    private String email;
    private String cpf;
    private String cargo;
    private String nivel;
    private String telefone;
    private String fotoPerfilUrl;

    // --- CAMPO CORRIGIDO ---
    // Agora envia o objeto Setor (nome, id) em vez de só o ID
    private SetorDTO setor;
    // --- FIM DA CORREÇÃO ---

    private Integer idGerente;
}