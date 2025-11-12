// 5. Service Setor (CRUD Básico)
package com.Connect.service;

import com.Connect.dto.SetorDTO;
import com.Connect.mapper.SetorMapper;
import com.Connect.model.Setor;
import com.Connect.repository.SetorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SetorService {

    private final SetorRepository setorRepository;
    private final SetorMapper setorMapper;

    public SetorService(SetorRepository setorRepository, SetorMapper setorMapper) {
        this.setorRepository = setorRepository;
        this.setorMapper = setorMapper;
    }

    @Transactional(readOnly = true)
    public List<SetorDTO> findAll() {
        return setorRepository.findAll().stream()
                .map(setorMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public SetorDTO create(SetorDTO dto) {
        Setor entity = setorMapper.toEntity(dto);
        Setor savedEntity = setorRepository.save(entity);
        return setorMapper.toDTO(savedEntity);
    }

    // (Poderíamos adicionar update e delete aqui se necessário)
}