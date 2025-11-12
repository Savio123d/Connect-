// 4. DTO para Enviar Feedbacks ao Frontend (com dados do remetente)
package com.Connect.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class FeedbackResponseDTO {
    private Long id;
    private String titulo;
    private String mensagem;
    private String categoria;
    private LocalDateTime dataEnvio;
    private Boolean anonimo;

    // Envia dados aninhados de quem enviou e quem recebeu
    // (O mapper cuidará para não enviar a senha)
    private ColaboradorResponseDTO remetente;
    private ColaboradorResponseDTO destinatario;
}