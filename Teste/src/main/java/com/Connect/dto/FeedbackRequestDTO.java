// 3. DTO para Criar Feedbacks
package com.Connect.dto;

import lombok.Data;

@Data
public class FeedbackRequestDTO {
    // Dados do formulário do frontend
    private String titulo;
    private String mensagem; // "descricao" no frontend
    private String categoria;
    private Long idRemetente;
    private Long idDestinatario; // Vamos adicionar este campo no form
    private Boolean anonimo; // Vamos adicionar este campo no form
}