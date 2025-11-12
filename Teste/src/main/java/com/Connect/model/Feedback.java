// 1. Entidade Feedback (baseado no Logico.png e feedback.jsx)
package com.Connect.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks") // Nome da tabela no Logico.png
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_feedback")
    private Long id;

    // Relacionamento com quem enviou (Remetente)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_remetente")
    private Colaborador remetente;

    // Relacionamento com quem recebe (Destinatário)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_destinatario", nullable = false)
    private Colaborador destinatario;

    // Campo 'titulo' existe no frontend (feedback.jsx) mas não no Logico.png
    // Adicionando para compatibilidade
    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "mensagem", columnDefinition = "TEXT", nullable = false)
    private String mensagem;

    // Campo 'categoria' existe no frontend (feedback.jsx) mas não no Logico.png
    // Adicionando para compatibilidade (elogio, sugestao, etc.)
    @Column(name = "categoria", length = 50)
    private String categoria;

    @CreationTimestamp
    @Column(name = "data_envio", updatable = false)
    private LocalDateTime dataEnvio;

    @Column(name = "anonimo", nullable = false)
    private Boolean anonimo = false;
}