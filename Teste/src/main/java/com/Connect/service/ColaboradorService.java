// Refatorado para lidar com o relacionamento com Setor
package com.Connect.service;

import com.Connect.dto.ColaboradorRequestDTO;
import com.Connect.dto.ColaboradorResponseDTO;
import com.Connect.dto.LoginRequestDTO;
import com.Connect.mapper.ColaboradorMapper;
import com.Connect.model.Colaborador;
import com.Connect.model.Setor; // Importar Setor
import com.Connect.repository.ColaboradorRepository;
import com.Connect.repository.SetorRepository; // Importar SetorRepository
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ColaboradorService {

    private final ColaboradorRepository repository;
    private final SetorRepository setorRepository; // Injetar repo de Setor
    private final ColaboradorMapper mapper;
    private final PasswordEncoder passwordEncoder;

    // Construtor completo com todas as injeções
    public ColaboradorService(ColaboradorRepository repository,
                              SetorRepository setorRepository, // Injeção do Setor
                              ColaboradorMapper mapper,
                              PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.setorRepository = setorRepository; // Atribuição
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<ColaboradorResponseDTO> listarTodos() {
        // --- ESTA É A CORREÇÃO PRINCIPAL PARA O BUG DO 'DESTINATÁRIO' ---
        // Troca repository.findAll() por repository.findAllWithSetor()
        // para forçar o JOIN e trazer os dados do setor.
        return repository.findAllWithSetor()
                .stream()
                .map(mapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ColaboradorResponseDTO buscarPorId(Long id) {
        Colaborador colaborador = repository.findById(id)
                // Lança uma exceção se não encontrar
                .orElseThrow(() -> new RuntimeException("Colaborador não encontrado com ID: " + id));
        return mapper.toResponseDTO(colaborador);
    }

    @Transactional
    public ColaboradorResponseDTO salvar(ColaboradorRequestDTO dto) {
        // 1. Busca a entidade Setor com base no ID recebido
        Setor setor = setorRepository.findById(dto.getIdSetor())
                .orElseThrow(() -> new RuntimeException("Setor não encontrado com ID: " + dto.getIdSetor()));

        // 2. Converte DTO para Entidade
        Colaborador colaborador = mapper.toEntity(dto);

        // 3. Define o relacionamento com o Setor
        colaborador.setSetor(setor);

        // 4. Codifica a senha antes de salvar
        colaborador.setSenha(passwordEncoder.encode(dto.getSenha()));

        // 5. Salva a entidade
        Colaborador colaboradorSalvo = repository.save(colaborador);

        // 6. Converte a entidade salva para o DTO de resposta
        return mapper.toResponseDTO(colaboradorSalvo);
    }

    @Transactional
    public ColaboradorResponseDTO atualizar(Long id, ColaboradorRequestDTO dto) {
        // 1. Busca a entidade Colaborador existente
        Colaborador colaborador = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Colaborador não encontrado com ID: " + id));

        // 2. Busca a entidade Setor com base no ID recebido
        Setor setor = setorRepository.findById(dto.getIdSetor())
                .orElseThrow(() -> new RuntimeException("Setor não encontrado com ID: " + dto.getIdSetor()));

        // 3. Atualiza os campos da entidade com os dados do DTO
        mapper.updateEntityFromDTO(dto, colaborador);

        // 4. Define o novo relacionamento com o Setor
        colaborador.setSetor(setor);

        // 5. Verifica se a senha foi fornecida para atualização
        if (dto.getSenha() != null && !dto.getSenha().isEmpty()) {
            colaborador.setSenha(passwordEncoder.encode(dto.getSenha()));
        }

        // 6. Salva a entidade atualizada
        Colaborador colaboradorAtualizado = repository.save(colaborador);

        // 7. Retorna o DTO de resposta
        return mapper.toResponseDTO(colaboradorAtualizado);
    }

    @Transactional
    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Colaborador não encontrado com ID: " + id);
        }
        repository.deleteById(id);
    }

    /**
     * MÉTODO DE LOGIN: Autentica um colaborador.
     * @param dto DTO com email e senha.
     * @return ColaboradorResponseDTO (sem senha) se as credenciais forem válidas.
     * @throws RuntimeException Se as credenciais forem inválidas.
     */
    @Transactional(readOnly = true)
    public ColaboradorResponseDTO login(LoginRequestDTO dto) {
        // 1. Encontrar o usuário pelo email (usando o método do repositório)
        Colaborador colaborador = repository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas: Usuário não encontrado."));

        // 2. Verificar a senha (comparar a senha crua do DTO com o hash do banco)
        if (!passwordEncoder.matches(dto.getSenha(), colaborador.getSenha())) {
            throw new RuntimeException("Credenciais inválidas: Senha incorreta.");
        }

        // 3. Retornar DTO de resposta (sem senha)
        return mapper.toResponseDTO(colaborador);
    }
}