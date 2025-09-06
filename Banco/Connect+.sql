/* Lógico_1: Script Final para o Banco de Dados Connect+ */

-- Tabela para organizar os usuários em setores/departamentos
CREATE TABLE Setor (
    ID_Setor INT PRIMARY KEY AUTO_INCREMENT,
    Nome_Setor VARCHAR(100) NOT NULL
);

-- Tabela principal de usuários do sistema
CREATE TABLE Usuarios (
    ID_Usuario INT PRIMARY KEY AUTO_INCREMENT,
    ID_Setor INT,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL, -- Aumentado para senhas com hash
    Cargo VARCHAR(100),
    Tipo_Usuario VARCHAR(50) DEFAULT 'Colaborador',
    Telefone VARCHAR(20),
    Foto_Perfil_URL VARCHAR(255),
    CONSTRAINT FK_Usuarios_Setor FOREIGN KEY (ID_Setor) REFERENCES Setor (ID_Setor)
);

-- Tabela para armazenar as tarefas
CREATE TABLE Tarefas (
    ID_Tarefa INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(100) NOT NULL,
    Descricao TEXT,
    Prioridade ENUM('Baixa', 'Média', 'Alta', 'Urgente') DEFAULT 'Média',
    Status ENUM('Pendente', 'Em Andamento', 'Concluída', 'Cancelada') DEFAULT 'Pendente',
    Data_Criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Data_Conclusao DATETIME
);

-- Tabela de associação para atribuir tarefas a USUÁRIOS específicos
CREATE TABLE Tarefa_Atribuicoes_Usuario (
    ID_Usuario INT,
    ID_Tarefa INT,
    PRIMARY KEY (ID_Usuario, ID_Tarefa),
    CONSTRAINT FK_Atribuicao_Usuario FOREIGN KEY (ID_Usuario) REFERENCES Usuarios (ID_Usuario),
    CONSTRAINT FK_Atribuicao_Tarefa_Usuario FOREIGN KEY (ID_Tarefa) REFERENCES Tarefas (ID_Tarefa)
);

-- NOVA TABELA: Para atribuir tarefas a SETORES/EQUIPES inteiras
CREATE TABLE Tarefa_Atribuicoes_Setor (
    ID_Setor INT,
    ID_Tarefa INT,
    PRIMARY KEY (ID_Setor, ID_Tarefa),
    CONSTRAINT FK_Atribuicao_Setor FOREIGN KEY (ID_Setor) REFERENCES Setor (ID_Setor),
    CONSTRAINT FK_Atribuicao_Tarefa_Setor FOREIGN KEY (ID_Tarefa) REFERENCES Tarefas (ID_Tarefa)
);

-- Tabela para o mural de avisos
CREATE TABLE Avisos (
    ID_Aviso INT PRIMARY KEY AUTO_INCREMENT,
    ID_Usuario INT, -- Corrigido de ID_Usuarios para ID_Usuario
    Titulo VARCHAR(100) NOT NULL,
    Conteudo TEXT,
    Data_Publicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Avisos_Usuario FOREIGN KEY (ID_Usuario) REFERENCES Usuarios (ID_Usuario)
);

-- Tabela para o sistema de feedbacks entre usuários
CREATE TABLE Feedbacks (
    ID_Feedback INT PRIMARY KEY AUTO_INCREMENT, -- Chave primária simplificada
    ID_Remetente INT,
    ID_Destinatario INT,
    Mensagem TEXT NOT NULL,
    Data_Envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Anonimo BOOLEAN DEFAULT FALSE,
    CONSTRAINT FK_Feedback_Remetente FOREIGN KEY (ID_Remetente) REFERENCES Usuarios (ID_Usuario),
    CONSTRAINT FK_Feedback_Destinatario FOREIGN KEY (ID_Destinatario) REFERENCES Usuarios (ID_Usuario)
);
ID_Aviso