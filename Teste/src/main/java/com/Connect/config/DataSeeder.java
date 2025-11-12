package com.Connect.config;

import com.Connect.model.Setor;
import com.Connect.repository.SetorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Esta classe roda automaticamente na inicialização do Spring Boot
 * e serve para popular o banco de dados com dados iniciais.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final SetorRepository setorRepository;

    public DataSeeder(SetorRepository setorRepository) {
        this.setorRepository = setorRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verifica se o banco já tem setores
        if (setorRepository.count() == 0) {
            System.out.println(">>> Banco de setores vazio. Populando dados iniciais...");

            // Aqui estão os dados que você pediu:
            Setor rh = new Setor();
            rh.setNomeSetor("Recursos Humanos");

            Setor ti = new Setor();
            ti.setNomeSetor("Tecnologia da Informação");

            Setor financeiro = new Setor();
            financeiro.setNomeSetor("Financeiro");

            Setor marketing = new Setor();
            marketing.setNomeSetor("Marketing");

            Setor vendas = new Setor();
            vendas.setNomeSetor("Vendas");

            Setor diretoria = new Setor();
            diretoria.setNomeSetor("Diretoria");

            // Salva todos os setores no banco de dados
            setorRepository.saveAll(List.of(rh, ti, financeiro, marketing, vendas, diretoria));

            System.out.println(">>> " + setorRepository.count() + " setores iniciais cadastrados com sucesso.");
        } else {
            System.out.println(">>> O banco de dados de setores já está populado.");
        }
    }
}