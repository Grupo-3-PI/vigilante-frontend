CREATE DATABASE IF NOT EXISTS PrevCrime_Vigilante;
USE PrevCrime_Vigilante;

CREATE TABLE EnderecoAgencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(8),
    rua VARCHAR(50),
    bairro VARCHAR(40),
    cidade VARCHAR(45),
    estado VARCHAR(20)
);

CREATE TABLE PlanoAssinatura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(30),
    data_assinatura DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Agencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    codigo_empresa VARCHAR(45),
    fk_endereco_agencia INT,
    fk_plano_assinatura INT,
    FOREIGN KEY (fk_endereco_agencia) REFERENCES EnderecoAgencia(id),
    FOREIGN KEY (fk_plano_assinatura) REFERENCES PlanoAssinatura(id)
);

INSERT INTO Agencia (nome, email, senha, codigo_empresa) VALUES
('CVC', 'cvc@email.com', 'cvc.123', '1');

CREATE TABLE AvisosSlack (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(45),
    mensagem VARCHAR(60),
    tipo_notificacao VARCHAR(20),
    data_envio DATETIME,
    status VARCHAR(20)
);

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    cargo_agencia VARCHAR(45),
    status VARCHAR(50) NOT NULL DEFAULT 'Ativo',
    fk_agencia INT,
    fk_notificacao_slack INT,
    FOREIGN KEY (fk_agencia) REFERENCES Agencia(id),
    FOREIGN KEY (fk_notificacao_slack) REFERENCES AvisosSlack(id)
);

INSERT INTO Usuario (nome, email, senha, cargo_agencia, status, fk_agencia)
VALUES
('Lucas', 'lucas@email.com', '12345678', 'Analista', 'Ativo', 1),
('Mariana', 'mariana@email.com', '12345678', 'Analista', 'Ativo', 1),
('Rafael', 'rafael@email.com', '12345678', 'Analista', 'Ativo', 1),
('Beatriz', 'beatriz@email.com', '12345678', 'Analista', 'Ativo', 1),
('Henrique', 'henrique@email.com', '12345678', 'Analista', 'Ativo', 1),
('Letícia', 'leticia@email.com', '12345678', 'Analista', 'Ativo', 1),
('Fernanda', 'fernanda@email.com', '12345678', 'Analista', 'Ativo', 1),
('Eduardo', 'eduardo@email.com', '12345678', 'Analista', 'Ativo', 1),
('Carolina', 'carolina@email.com', '12345678', 'Analista', 'Ativo', 1),
('Gabriel', 'gabriel@email.com', '12345678', 'Analista', 'Ativo', 1);

CREATE TABLE Municipio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_municipio VARCHAR(45) NOT NULL
);

INSERT INTO Municipio (id, nome_municipio) VALUES
(1, 'Bertioga'),
(2, 'Cubatão'),
(3, 'Guarujá'),
(4, 'Itanhaém'),
(5, 'Mongaguá'),
(6, 'Peruíbe'),
(7, 'Praia Grande'),
(8, 'Santos'),
(9, 'São Vicente');

CREATE TABLE Ocorrencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_ocorrencia VARCHAR(45),
    qtd_ocorrencias INT,
    mes INT,
    ano INT,
    nome_crime VARCHAR(100),
    gravidade INT,
    fk_municipio INT,
    FOREIGN KEY (fk_municipio) REFERENCES Municipio(id)
);

CREATE TABLE Logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mensagem VARCHAR(500),
    tipo VARCHAR(45),
    dt_registro VARCHAR(45)
);

CREATE TABLE Administrador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100)
);

CREATE TABLE Filtros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    data_criacao DATETIME,
    descricao VARCHAR(45),
    categoria VARCHAR(45),
    fk_administrador INT,
    FOREIGN KEY (fk_administrador) REFERENCES Administrador(id)
);

CREATE TABLE Pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(45),
    status VARCHAR(30),
    data_criacao DATETIME,
    fk_usuario INT,
    fk_administrador INT,
    FOREIGN KEY (fk_usuario) REFERENCES Usuario(id),
    FOREIGN KEY (fk_administrador) REFERENCES Administrador(id)
);