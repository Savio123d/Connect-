// 5. Mapper para converter Feedback <-> DTO
package com.Connect.mapper;

import com.Connect.dto.FeedbackRequestDTO;
import com.Connect.dto.FeedbackResponseDTO;
import com.Connect.model.Colaborador;
import com.Connect.model.Feedback;
import org.springframework.stereotype.Component;

@Component
public class FeedbackMapper {

    // Injeta o mapper de colaborador para tratar os DTOs aninhados
    private final ColaboradorMapper colaboradorMapper;

    public FeedbackMapper(ColaboradorMapper colaboradorMapper) {
        this.colaboradorMapper = colaboradorMapper;
    }

    public Feedback toEntity(FeedbackRequestDTO dto, Colaborador remetente, Colaborador destinatario) {
        Feedback feedback = new Feedback();
        feedback.setTitulo(dto.getTitulo());
        feedback.setMensagem(dto.getMensagem());
        feedback.setCategoria(dto.getCategoria());
        feedback.setAnonimo(dto.getAnonimo());

        // Define as entidades de relacionamento
        feedback.setRemetente(remetente);
        feedback.setDestinatario(destinatario);

        // dataEnvio é gerada automaticamente pelo @CreationTimestamp
        return feedback;
    }

    public FeedbackResponseDTO toResponseDTO(Feedback entity) {
        FeedbackResponseDTO dto = new FeedbackResponseDTO();
        dto.setId(entity.getId());
        dto.setTitulo(entity.getTitulo());
        dto.setMensagem(entity.getMensagem());
        dto.setCategoria(entity.getCategoria());
        dto.setDataEnvio(entity.getDataEnvio());
        dto.setAnonimo(entity.getAnonimo());

        // Se for anônimo, não envia os dados do remetente
        if (!entity.getAnonimo()) {
            dto.setRemetente(colaboradorMapper.toResponseDTO(entity.getRemetente()));
        } else {
            // Cria um remetente "Anônimo"
            dto.setRemetente(colaboradorMapper.getAnonimoResponseDTO());
        }

        dto.setDestinatario(colaboradorMapper.toResponseDTO(entity.getDestinatario()));
        return dto;
    }
}