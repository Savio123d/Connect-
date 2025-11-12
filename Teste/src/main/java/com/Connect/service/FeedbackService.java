// 6. Service (Lógica de Negócio) para Feedback
package com.Connect.service;

import com.Connect.dto.FeedbackRequestDTO;
import com.Connect.dto.FeedbackResponseDTO;
import com.Connect.mapper.FeedbackMapper;
import com.Connect.model.Colaborador;
import com.Connect.model.Feedback;
import com.Connect.repository.ColaboradorRepository;
import com.Connect.repository.FeedbackRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final ColaboradorRepository colaboradorRepository;
    private final FeedbackMapper feedbackMapper;

    public FeedbackService(FeedbackRepository feedbackRepository,
                           ColaboradorRepository colaboradorRepository,
                           FeedbackMapper feedbackMapper) {
        this.feedbackRepository = feedbackRepository;
        this.colaboradorRepository = colaboradorRepository;
        this.feedbackMapper = feedbackMapper;
    }

    @Transactional
    public FeedbackResponseDTO create(FeedbackRequestDTO dto) {
        // 1. Busca as entidades Colaborador (quem envia e quem recebe)
        Colaborador remetente = colaboradorRepository.findById(dto.getIdRemetente())
                .orElseThrow(() -> new RuntimeException("Remetente não encontrado"));

        Colaborador destinatario = colaboradorRepository.findById(dto.getIdDestinatario())
                .orElseThrow(() -> new RuntimeException("Destinatário não encontrado"));

        // 2. Mapeia o DTO para a Entidade Feedback
        Feedback feedback = feedbackMapper.toEntity(dto, remetente, destinatario);

        // 3. Salva no banco
        Feedback feedbackSalvo = feedbackRepository.save(feedback);

        // 4. Retorna o DTO de Resposta
        return feedbackMapper.toResponseDTO(feedbackSalvo);
    }

    @Transactional(readOnly = true)
    public List<FeedbackResponseDTO> getSentByMe(Long remetenteId) {
        return feedbackRepository.findByRemetenteId(remetenteId).stream()
                .map(feedbackMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FeedbackResponseDTO> getReceivedByMe(Long destinatarioId) {
        return feedbackRepository.findByDestinatarioId(destinatarioId).stream()
                .map(feedbackMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void delete(Long feedbackId, Long userId) {
        // 1. Busca o feedback
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Feedback não encontrado"));

        // 2. Verifica se o usuário logado é o remetente
        if (!feedback.getRemetente().getId().equals(userId)) {
            throw new RuntimeException("Não autorizado: Você só pode deletar feedbacks enviados por você.");
        }

        // 3. Deleta o feedback
        feedbackRepository.delete(feedback);
    }
}