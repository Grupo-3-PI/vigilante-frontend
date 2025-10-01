CREATE DATABASE PrevCrime_Vigilante;
USE PrevCrime_Vigilante;

CREATE TABLE Agencia (
    idAgencia INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45),
    dtCadastro DATE DEFAULT current_timestamp,
    statusAssinatura VARCHAR(45),
    codigoEmpresa VARCHAR(45)
);

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45),
    dtCadastro DATE DEFAULT current_timestamp,
    cargoAgencia VARCHAR(45),
    fkAgencia INT,
    FOREIGN KEY (fkAgencia) REFERENCES Agencia(idAgencia)
);

CREATE TABLE Municipio (
    idMunicipio INT PRIMARY KEY,
    nomeMunicipio VARCHAR(45)
);

CREATE TABLE EstatisticaCriminalidade (
    idEstatistica INT PRIMARY KEY,
    tipoCrime VARCHAR(45),
    qtdOcorrencias INT,
    numeroMes INT,
    ano INT,
    fkMunicipio INT,
    FOREIGN KEY (fkMunicipio) REFERENCES Municipio(idMunicipio)
);

CREATE TABLE Relatorio (
    idRelatorio INT PRIMARY KEY,
    fkUsuario INT,
    fkEstatistica INT,
    fkRelatorioMunicipio INT,
    tituloRelatorio VARCHAR(45),
    dtGeracao DATE DEFAULT current_timestamp,
    filtros VARCHAR(100),
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (fkEstatistica) REFERENCES EstatisticaCriminalidade(idEstatistica),
    FOREIGN KEY (fkRelatorioMunicipio) REFERENCES Municipio(idMunicipio)
);

SELECT * FROM Agencia;
SELECT * FROM Usuario;
SELECT * FROM Relatorio;