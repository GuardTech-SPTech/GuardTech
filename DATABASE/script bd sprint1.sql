CREATE DATABASE guardtech;

USE guardtech;

-- TABELAS CRIADAS 
CREATE TABLE empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45),
    cnpj CHAR(14),
    email VARCHAR(45),
    senha VARCHAR (45)
); 

CREATE TABLE endereco(
	idEndereco INT PRIMARY KEY AUTO_INCREMENT, 
    cep CHAR(9),
	numero VARCHAR(45),
    logradouro VARCHAR(45),
    bairro VARCHAR(45),
    estado VARCHAR(45),
    cidade VARCHAR(45),
    complemento VARCHAR(45),
    fkEmpresa INT, 
    CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE armazem(
	idArmazem INT PRIMARY KEY AUTO_INCREMENT,
    capacidade DECIMAL (6,2),
    descricao VARCHAR(45),
    fkEmpresa INT, 
    CONSTRAINT fkArmazemempresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    fkEndereco INT, 
    CONSTRAINT fkArmazemEndereco FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco),
    fkTipoArmazenamento INT,
    CONSTRAINT fkArmazemTipoArmazenamento FOREIGN KEY (fkTipoArmazenamento) REFERENCES tipoArmazenamento(idTipoArmazem)
);

CREATE TABLE telefone(
	idTelefone INT PRIMARY KEY AUTO_INCREMENT, 
    ddd CHAR(2),
    prefixo CHAR(5),
    sufixo CHAR(4),
    fkEmpresa INT,
    CONSTRAINT fkTelefoneEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    fkArmazem INT, 
    CONSTRAINT fkTelefoneArmazem FOREIGN KEY (fkArmazem) REFERENCES armazen(idArmazem)
);

CREATE TABLE tipoFuncionario(
	idTipoFuncionario INT PRIMARY KEY AUTO_INCREMENT, 
    funcao VARCHAR(45)
);

CREATE TABLE funcionario(
	idFuncionario INT AUTO_INCREMENT,
	fkEmpresa INT,
    CONSTRAINT pkCompostaFuncionarioEmpresa PRIMARY KEY (idFuncionario, fkEmpresa),
    username VARCHAR(45),
    senha VARCHAR(20),
    email VARCHAR(45),
    nomeCompleto VARCHAR(45),
    cpf CHAR(15),
    fkTipoFuncionario INT, 
    CONSTRAINT fkFuncionarioTipo FOREIGN KEY (fkTipoFuncionario) REFERENCES tipoFuncionario (idTipoFuncionario),
    CONSTRAINT fkFuncionaroEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
); 

CREATE TABLE parametro(
	idParametro INT PRIMARY KEY AUTO_INCREMENT, 
    minTemp DECIMAL (4,2),
    maxTemp DECIMAL (4,2),
    minUmid DECIMAL (4,2),
    maxUmid DECIMAL (4,2),
    fkPrazo INT,
	CONSTRAINT ParametroPrazo FOREIGN KEY (fkPrazo) REFERENCES prazo(idPrazo)
);

CREATE TABLE sensor(
	idSensor INT AUTO_INCREMENT, 
    modelo VARCHAR(45),
    posicao VARCHAR(45),
    fkParametro INT, 
    CONSTRAINT fkSensorParametro FOREIGN KEY (fkParametro) REFERENCES parametro(idParametro),
    CONSTRAINT pkCompostaSensorParametro PRIMARY KEY (idSensor, fkParametro),
	fkArmazem INT,
    CONSTRAINT fkSensorArmazem FOREIGN KEY (fkArmazen) REFERENCES armazem(idArmazem),
    CONSTRAINT pkCompostaSensorArmazem PRIMARY KEY (idSensor, fkParametro)
);

CREATE TABLE registro(
	idRegistro INT AUTO_INCREMENT, 
    dht11_temperatura DECIMAL (4,2),
    dht11_umidade DECIMAL (4,2),
    dataHora DATETIME,
	fkSensor INT, 
    CONSTRAINT pkComposta PRIMARY KEY (idRegistro, fkSensor),
    CONSTRAINT fkRegistroSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

CREATE TABLE perguntaFrequente(
	idPerguntaFrequente INT PRIMARY KEY AUTO_INCREMENT, 
    pergunta VARCHAR(400),
    resposta VARCHAR(200)
);

CREATE TABLE tipoArmazem(
	idTipoArmazen INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45)
);

CREATE TABLE email (
	idEmail INT PRIMARY KEY AUTO_INCREMENT,
    endeco VARCHAR(256),
    mensagem VARCHAR(900)
);

CREATE TABLE prazo (
	idPrazo INT,
    limite VARCHAR(45)
);

-- INSERTS DAS TABELAS 
 
INSERT INTO empresa (nome, cnpj, email, senha) VALUES 
('AgroArmazéns', '12345678910001', 'gestao@agroarmazens.com', 'agro123'),
('GrãoSafra', '12345678920001', 'gestao@graosafra.com', 'grao321'),
('ProtegeMilho', '12345678930001', 'adm@protegemilho.com', 'protege456'),
('MilhoGuarda', '12345678940001', 'gestao@milhoguarda.com', 'guarda654'),
('LogísticaMilho', '12345678950001', 'adm1@logisticamilho.com', 'logis789');

INSERT INTO endereco (cep, numero, logradouro, bairro, estado, cidade, complemento, fkEmpresa) VALUES
('01234-111', '1011', 'Avenida', 'Bela Vista', 'São Paulo', 'São Paulo', 'prédio', 1),
('01234-222', '2022', 'Avenida', 'Centro', 'São Paulo', 'São Paulo', 'prédio', 2),
('01234-333', '3033', 'Avenida', 'Vila Nova', 'Minas Gerais', 'Belo Horizonte', 'prédio', 3),
('01234-444', '4044', 'Avenida', 'Centro', 'Minas Gerais', 'Belo Horizonte', 'prédio', 4),
('01234-555', '5055', 'Avenida', 'Vila Madalena', 'São Paulo', 'São Paulo', 'prédio', 5),
('54321-999', '101', 'Rua', 'Centro', 'São Paulo', 'Sorocaba', 'fazenda', 1),
('54321-888', '202', 'Rua', 'Jardim das Flores', 'São Paulo', 'Itupeva', 'fazenda', 2),
('54321-777', '303', 'Rua', 'Vila Clara', 'Minas Gerais', 'Montes Claros', 'fazenda', 3),
('54321-666', '404', 'Rua', 'Cidade do Vale', 'Minas Gerais', 'Uberlândia', 'fazenda', 4),
('54321-555', '505', 'Rua', 'Boa Viagem', 'São Paulo', 'São Carlos', 'fazenda', 5),
('54321-444', '409', 'Rua', 'São Joaquim', 'Minas Gerais', 'Juiz de Fora', 'fazenda', 1),
('54321-333', '509', 'Rua', 'Clara Manhã', 'São Paulo', 'Rio Preto', 'fazenda', 2);

INSERT INTO armazen (capacidade, descricao, fkEmpresa, fkEndereco) VALUES
(1000, null, 1, 6),
(2200, null, 2, 7),
(4000, null, 3, 8),
(5550, null, 4, 9),
(1000, null, 5, 10),
(3200, null, 1, 11),
(8900, null, 2, 12);

INSERT INTO telefone (ddd, prefixo, sufixo, fkEmpresa, fkArmazen) VALUES 
('11', '95656', '1111', 1, 8),
('11', '94545', '2222', 2, 9),
('31', '93434', '3333', 3, 10),
('31', '92323', '4444', 4, 11),
('11', '91212', '5555', 5, 12),
('11', '98989', '8888', 1, 13),
('11', '99898', '9999', 2, 14);

INSERT INTO tipoFuncionario (funcao) VALUES
('Operador'),
('Administrador');

INSERT INTO funcionario (fkEmpresa, username, senha, email, nomeCompleto, cpf, fkTipoFuncionario) VALUES 
(1, 'aghataDiniz', 'diniz123', 'diniz.aghata@gmail.com', 'Aghata Souza Diniz', '121.212.121-21', 1),
(2, 'pereiraAlvaro', 'pereira123', 'pereira.alvaro@gmail.com', 'Alvaro Pereira Silva', '232.323.232-32', 1),
(3, 'camilaCasi', 'casimiro123', 'casimiro.camila@gmail.com', 'Camila Casimiro Domingues', '343.434.343-43', 2),
(4, 'letCordeiro', 'cordeiro123', 'cordeiro.leticia@gmail.com', 'Leticia Costa Cordeiro', '454.545.454-54', 2),
(5, 'vihSilva', 'silva123', 'silva.vitoria@gmail.com', 'Vitória Serqueira Silva', '565.656.565-65', 1);

INSERT INTO prazo (limite) VALUES
(

INSERT INTO parametro (minTemp, maxTemp, minUmid, maxUmid, fkPrazo) VALUES
(, 35, , 20,); 
 

INSERT INTO sensor (modelo, posicao, fkParametro) VALUES
('DHT11', 'Entrada a esquerda', 1),
('DHT11', 'Saida a direita', 1),
('DHT11', 'Saida a esquerda', 1),
('DHT11', 'Entrada', 1),
('DHT11', 'Parede lateral a esquerda da saida', 1),
('DHT11', 'Saida', 1),
('DHT11', 'Entrada a direira', 1); 

INSERT INTO perguntaFrequente (pergunta, resposta) VALUES
('Meu sensor parou de funcionar! E agora', 'Comunique a nossa equipe para que possammos fazer o reparo!'),
('Como vizualizar os dados capturados?', 'Os dados capturados são armazenados e enviados para a Dashboard que está inserida em sua plataforma web!'),
('Como posso entrar em contato com a GuardTech', 'Basta você enviar um email para o endereço guardtech@gmail.com que a nossa equipe de especialistas irá retornar o contato');

INSERT INTO tipoArmazem (nome) VALUES
('Silo'); 

-- SELECT'S
SHOW TABLES;
SELECT * FROM armazen;
SELECT * FROM empresa;
SELECT * FROM endereco;
SELECT * FROM funcionario;
SELECT * FROM parametro;
SELECT * FROM sensor;
SELECT * FROM tipofuncionario;
SELECT * FROM telefone;


-- select com empresas e seus funcionários/tipos
SELECT empresa.idEmpresa AS 'ID da Empresa',
empresa.nome AS Nome,
empresa.cnpj AS CNPJ,
empresa.email AS 'Email da empresa',
funcionario.idFuncionario AS 'ID do Funcionário',
funcionario 

-- select com nome, email e senha das empresas

-- select com nome dos funcionarios e tipo




