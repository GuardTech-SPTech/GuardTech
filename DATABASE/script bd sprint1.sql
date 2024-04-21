CREATE DATABASE guardtech;

USE guardtech;

CREATE TABLE empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45),
    cmpj CHAR(14),
    email VARCHAR(45),
    senha VARCHAR (45)
);

CREATE TABLE Endereco (
	idEndereco INT PRIMARY KEY AUTO_INCREMENT, 
    cep CHAR(9),
	numero VARCHAR(45),
    logradouro VARCHAR(45),
    bairro VARCHAR(45),
    estado VARCHAR(45),
    cidade VARCHAR(45),
    complemento VARCHAR(45),
    fkEmpresa INT, 
    CONSTRAINT EnderecoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE Armazen(
	idArmazen INT PRIMARY KEY AUTO_INCREMENT,
    capacidade DECIMAL (6,2),
    descricao VARCHAR(45),
    fkEmpresa INT, 
    CONSTRAINT ArmazenEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    fkEndereco INT, 
    CONSTRAINT ArmazenEndereco FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco)
);

CREATE TABLE telefone(
	idTelefone INT PRIMARY KEY AUTO_INCREMENT, 
    ddd CHAR(12),
    prefixo CHAR(5),
    sufixo CHAR(4),
    fkEmpresa INT,
    CONSTRAINT telefoneEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    fkArmazen INT, 
    CONSTRAINT telefoneArmazen FOREIGN KEY (fkArmazen) REFERENCES armazen(idArmazen)
);

CREATE TABLE tipoFuncionario(
	idTipoFuncionario INT PRIMARY KEY AUTO_INCREMENT, 
    funcao VARCHAR(45)
);


CREATE TABLE Funcionario(
	idFuncionario INT AUTO_INCREMENT,
	fkEmpresa INT,
    CONSTRAINT pkComposta PRIMARY KEY (idFuncionario, fkEmpresa) ,
    username VARCHAR(45),
    senha VARCHAR(20),
    email VARCHAR(45),
    nomeCompleto VARCHAR(45),
    cpf VARCHAR(45),
    fkTipoFuncionario INT, 
    CONSTRAINT FuncionarioTipo FOREIGN KEY (fkTipoFuncionario) REFERENCES tipoFuncionario (idTipoFuncionario),
    CONSTRAINT FuncionaroEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE parametro(
	idParametro INT PRIMARY KEY AUTO_INCREMENT, 
    minTemp DECIMAL (4,2),
    maxTemp DECIMAL (4,2),
    minUmid DECIMAL (4,2),
    maxUmid DECIMAL (4,2)
);

CREATE TABLE sensor(
	idSensor INT PRIMARY KEY AUTO_INCREMENT, 
    modelo VARCHAR(45),
    posicao VARCHAR(45),
    fkParametro INT, 
    CONSTRAINT sensorParametro FOREIGN KEY(fkParametro) REFERENCES parametro(idParametro)
);

CREATE TABLE registro(
	idRegistro INT AUTO_INCREMENT, 
    fkSensor INT, 
    CONSTRAINT pkComposta PRIMARY KEY (idRegistro, fkSensor),
    dht11_temperatura DECIMAL (4,2),
    dht11_umidade DECIMAL (4,2),
    dataHora DATETIME,
    CONSTRAINT registroSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

Create TABLE perguntaFrequente(
	idPerguntaFrequente INT PRIMARY KEY AUTO_INCREMENT, 
    pergunta VARCHAR(400),
    resposta VARCHAR(200)
);

CREATE TABLE tipoArmazen(
	idTipoArmazen INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45)
);