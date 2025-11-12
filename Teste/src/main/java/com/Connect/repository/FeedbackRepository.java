// 2. Repositório para Feedback
package com.Connect.repository;

import com.Connect.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    // Para a aba "Meus Feedbacks" (enviados)
    List<Feedback> findByRemetenteId(Long remetenteId);

    // Para a aba "Feedbacks Recebidos"
    List<Feedback> findByDestinatarioId(Long destinatarioId);
}