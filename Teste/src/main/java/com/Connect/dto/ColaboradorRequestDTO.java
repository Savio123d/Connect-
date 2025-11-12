package com.Connect.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para receber dados de criação e atualização de Colaborador.
 * Contém a senha e campos do frontend.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColaboradorRequestDTO {

    // Campos do register.jsx
    private String nome;
    private String email;
    private String cpf;
    private String senha;
    private String funcao; // O frontend envia "funcao", vamos mapear para "cargo"
    private String nivel;

    // Campos do Colaborador.java e Connect+.sql
    private String telefone;
    private String fotoPerfilUrl;
    private Integer idSetor;
    private Integer idGerente;
}