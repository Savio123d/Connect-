
CREATE TABLE Status_Tarefa (
    ID_Status INT PRIMARY KEY AUTO_INCREMENT,
    Nome_Status VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Prioridade_Tarefa (
    ID_Prioridade INT PRIMARY KEY AUTO_INCREMENT,
    Nome_Prioridade VARCHAR(50) UNIQUE NOT NULL
);


CREATE TABLE Setor (
    ID_Setor INT PRIMARY KEY AUTO_INCREMENT,
    Nome_Setor VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Colaborador (
    ID_Colaborador INT PRIMARY KEY AUTO_INCREMENT,
    ID_Setor INT NOT NULL,
    ID_Gerente INT, 
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Senha VARCHAR(255) NOT NULL, 
    Cargo VARCHAR(100),
    Telefone VARCHAR(20),
    Foto_Perfil_URL VARCHAR(255),
    CONSTRAINT FK_Colaborador_Setor FOREIGN KEY (ID_Setor) REFERENCES Setor (ID_Setor),
    CONSTRAINT FK_Colaborador_Gerente FOREIGN KEY (ID_Gerente) REFERENCES Colaborador (ID_Colaborador)
);

CREATE TABLE Tarefas (
    ID_Tarefa INT PRIMARY KEY AUTO_INCREMENT,
    ID_Status INT NOT NULL,
    ID_Prioridade INT NOT NULL,
    Titulo VARCHAR(100) NOT NULL,
    Descricao TEXT,
    Data_Criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Data_Vencimento DATETIME, 
    Data_Conclusao DATETIME NULL, 
    CONSTRAINT FK_Tarefas_Status FOREIGN KEY (ID_Status) REFERENCES Status_Tarefa (ID_Status),
    CONSTRAINT FK_Tarefas_Prioridade FOREIGN KEY (ID_Prioridade) REFERENCES Prioridade_Tarefa (ID_Prioridade)
);

CREATE TABLE Tarefa_Atribuicoes_Colaborador (
    ID_Tarefa INT NOT NULL,
    ID_Colaborador INT NOT NULL,
    ID_Atribuidor INT, 
    PRIMARY KEY (ID_Tarefa, ID_Colaborador), 
    CONSTRAINT FK_Atribuicao_Tarefa FOREIGN KEY (ID_Tarefa) REFERENCES Tarefas (ID_Tarefa) ON DELETE CASCADE,
    CONSTRAINT FK_Atribuicao_Colaborador FOREIGN KEY (ID_Colaborador) REFERENCES Colaborador (ID_Colaborador) ON DELETE CASCADE,
    CONSTRAINT FK_Atribuicao_Atribuidor FOREIGN KEY (ID_Atribuidor) REFERENCES Colaborador (ID_Colaborador) ON DELETE SET NULL
);

CREATE TABLE Tarefa_Atribuicoes_Setor (
    ID_Tarefa INT NOT NULL,
    ID_Setor INT NOT NULL,
    PRIMARY KEY (ID_Tarefa, ID_Setor),
    CONSTRAINT FK_AtribuicaoSetor_Tarefa FOREIGN KEY (ID_Tarefa) REFERENCES Tarefas (ID_Tarefa) ON DELETE CASCADE,
    CONSTRAINT FK_AtribuicaoSetor_Setor FOREIGN KEY (ID_Setor) REFERENCES Setor (ID_Setor) ON DELETE CASCADE
);

CREATE TABLE Avisos (
    ID_Aviso INT PRIMARY KEY AUTO_INCREMENT,
    ID_Autor INT NOT NULL,
    Titulo VARCHAR(100) NOT NULL,
    Conteudo TEXT,
    Data_Publicacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Avisos_Autor FOREIGN KEY (ID_Autor) REFERENCES Colaborador (ID_Colaborador)
);

CREATE TABLE Feedbacks (
    ID_Feedback INT PRIMARY KEY AUTO_INCREMENT,
    ID_Remetente INT, 
    ID_Destinatario INT NOT NULL,
    Mensagem TEXT NOT NULL,
    Data_Envio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Anonimo BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT FK_Feedbacks_Remetente FOREIGN KEY (ID_Remetente) REFERENCES Colaborador (ID_Colaborador),
    CONSTRAINT FK_Feedbacks_Destinatario FOREIGN KEY (ID_Destinatario) REFERENCES Colaborador (ID_Colaborador)
);


CREATE TABLE Tarefa_Comentarios (
    ID_Comentario INT PRIMARY KEY AUTO_INCREMENT,
    ID_Tarefa INT NOT NULL,
    ID_Autor INT NOT NULL,
    Comentario TEXT NOT NULL,
    Data_Criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Comentarios_Tarefa FOREIGN KEY (ID_Tarefa) REFERENCES Tarefas (ID_Tarefa) ON DELETE CASCADE,
    CONSTRAINT FK_Comentarios_Autor FOREIGN KEY (ID_Autor) REFERENCES Colaborador (ID_Colaborador)
);

INSERT INTO Status_Tarefa (Nome_Status) VALUES
('Pendente'),
('Em Andamento'),
('Concluída'),
('Cancelada');

INSERT INTO Prioridade_Tarefa (Nome_Prioridade) VALUES
('Baixa'),
('Média'),
('Alta'),
('Urgente');