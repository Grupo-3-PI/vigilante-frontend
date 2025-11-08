CREATE DATABASE PrevCrime_Vigilante;
USE PrevCrime_Vigilante;

CREATE TABLE Agencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status_assinatura VARCHAR(45),
    codigo_empresa VARCHAR(45)
);

INSERT INTO Agencia (nome, email, senha, status_assinatura, codigo_empresa) VALUES
('CVC', 'cvc@email.com', 'cvc.123', 'ativo', '1');

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(20) NOT NULL,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    cargo_agencia VARCHAR(45),
    fk_agencia INT,
    FOREIGN KEY (fk_agencia) REFERENCES Agencia(id)
);

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
    nome_crime VARCHAR(100) NOT NULL,
    qtd_ocorrencias INT,
    mes INT,
    ano INT,
    gravidade INT,
    tipo_ocorrencia VARCHAR(45),
    fk_municipio INT,
    FOREIGN KEY (fk_municipio) REFERENCES Municipio(id)
);

SELECT * FROM Ocorrencias;

CREATE TABLE Relatorio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_Usuario INT,
    fk_EstatisticaCriminalidade INT, 
    titulo_relatorio VARCHAR(45),
    dt_geracao DATETIME,
    filtros VARCHAR(45),
    FOREIGN KEY (fk_Usuario) REFERENCES Usuario(id)
);

CREATE TABLE Logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mensagem VARCHAR(45),
    tipo VARCHAR(45),
    dt_registro VARCHAR(45)
);

select * from Usuario;
select * from Agencia;