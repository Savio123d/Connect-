// 4. Mapper Setor
package com.Connect.mapper;

import com.Connect.dto.SetorDTO;
import com.Connect.model.Setor;
import org.springframework.stereotype.Component;

@Component
public class SetorMapper {

    public Setor toEntity(SetorDTO dto) {
        Setor entity = new Setor();
        entity.setId(dto.getId());
        entity.setNomeSetor(dto.getNomeSetor());
        return entity;
    }

    public SetorDTO toDTO(Setor entity) {
        if (entity == null) return null;
        SetorDTO dto = new SetorDTO();
        dto.setId(entity.getId());
        dto.setNomeSetor(entity.getNomeSetor());
        return dto;
    }

    public void updateEntityFromDTO(SetorDTO dto, Setor entity) {
        entity.setNomeSetor(dto.getNomeSetor());
    }
}