// Refatorado para lidar com o objeto Setor
package com.Connect.mapper;

import com.Connect.dto.ColaboradorRequestDTO;
import com.Connect.dto.ColaboradorResponseDTO;
import com.Connect.dto.SetorDTO; // Importar SetorDTO
import com.Connect.model.Colaborador;
// import com.Connect.model.Setor; // Não é mais necessário aqui
import org.springframework.stereotype.Component;

@Component
public class ColaboradorMapper {

    // Injetar o mapper de Setor para reutilização
    private final SetorMapper setorMapper;

    public ColaboradorMapper(SetorMapper setorMapper) {
        this.setorMapper = setorMapper;
    }

    /**
     * Converte um RequestDTO em uma Entidade.
     * O 'setor' será tratado no Service, pois precisamos buscá-lo do banco.
     */
    public Colaborador toEntity(ColaboradorRequestDTO dto) {
        Colaborador entity = new Colaborador();
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        entity.setCpf(dto.getCpf());
        entity.setSenha(dto.getSenha());
        entity.setCargo(dto.getFuncao());
        entity.setNivel(dto.getNivel());
        entity.setTelefone(dto.getTelefone());
        entity.setFotoPerfilUrl(dto.getFotoPerfilUrl());
        entity.setIdGerente(dto.getIdGerente());
        // O entity.setSetor() é feito no Service
        return entity;
    }

    /**
     * Converte uma Entidade Colaborador em um ResponseDTO.
     */
    public ColaboradorResponseDTO toResponseDTO(Colaborador entity) {
        if (entity == null) {
            return getAnonimoResponseDTO();
        }

        ColaboradorResponseDTO dto = new ColaboradorResponseDTO();
        dto.setId(entity.getId());
        dto.setNome(entity.getNome());
        dto.setEmail(entity.getEmail());
        dto.setCpf(entity.getCpf());
        dto.setCargo(entity.getCargo());
        dto.setNivel(entity.getNivel());
        dto.setTelefone(entity.getTelefone());
        dto.setFotoPerfilUrl(entity.getFotoPerfilUrl());

        // --- MAPEAMENTO CORRIGIDO ---
        // Converte a entidade Setor para SetorDTO
        dto.setSetor(setorMapper.toDTO(entity.getSetor()));
        // --- FIM DA CORREÇÃO ---

        dto.setIdGerente(entity.getIdGerente());
        return dto;
    }

    public ColaboradorResponseDTO getAnonimoResponseDTO() {
        ColaboradorResponseDTO dto = new ColaboradorResponseDTO();
        dto.setId(0L);
        dto.setNome("Anônimo");
        dto.setCargo("N/A");
        dto.setFotoPerfilUrl("https://placehold.co/64x64/6b7280/FFFFFF?text=?");

        // Define um setor "N/A" para o anônimo
        SetorDTO setorAnonimo = new SetorDTO();
        setorAnonimo.setId(0);
        setorAnonimo.setNomeSetor("N/A");
        dto.setSetor(setorAnonimo);

        return dto;
    }

    public void updateEntityFromDTO(ColaboradorRequestDTO dto, Colaborador entity) {
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        entity.setCpf(dto.getCpf());
        entity.setCargo(dto.getFuncao());
        entity.setNivel(dto.getNivel());
        entity.setTelefone(dto.getTelefone());
        entity.setFotoPerfilUrl(dto.getFotoPerfilUrl());
        entity.setIdGerente(dto.getIdGerente());
        // O entity.setSetor() é feito no Service
    }
}