CREATE DATABASE vigilante;
USE vigilante;

CREATE TABLE agencia (
idAgencia INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (100) NOT NULL,
cnpj char (14) not null unique,
telefone char (11) not null,
email varchar (80) not null,
cep char (8) not null,
numero varchar(10),
logradouro varchar(80),
bairro varchar (50),
estadoUF char (2) not null,
cidade varchar (80) not null,
complemento varchar(100),
codigoAtivacao char(6) not null
);

-- Inserindo agência
insert into agencia (nome, cnpj, telefone, email, cep, numero, logradouro, bairro, estadoUf, cidade, complemento, codigoAtivacao) values
('Agência Santos', '12345678000195',  '11999998888',  'agenciasantos@hotmail.com.br', '04547000', '123',  'Av. das Nações Unidas', 'Brooklin', 'SP', 'São Paulo',   'Conjunto 42',  'ABC123');

 create table funcionario(
 idFuncionario int primary key auto_increment,
 nome varchar(45) not null,
 email varchar(45) not null,
 senha varchar(15) not null,
 fkAgencia int,
 constraint fkAgencia_funcionario foreign key(fkAgencia) references agencia(idAgencia)
 );
 
 SELECT * FROM agencia;
 SELECT * FROM funcionario;
 
