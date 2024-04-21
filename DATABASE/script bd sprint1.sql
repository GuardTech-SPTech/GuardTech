CREATE DATABASE guardtech;

USE guardtech;

-- TABELAS CRIADAS 
CREATE TABLE empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45),
    cnpj CHAR(14),
    email VARCHAR(45),
    senha VARCHAR (45)
); 

CREATE TABLE endereco (
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

CREATE TABLE armazen(
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
    ddd CHAR(2),
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

CREATE TABLE funcionario(
	idFuncionario INT AUTO_INCREMENT,
	fkEmpresa INT,
    CONSTRAINT pkComposta PRIMARY KEY (idFuncionario, fkEmpresa) ,
    username VARCHAR(45),
    senha VARCHAR(20),
    email VARCHAR(45),
    nomeCompleto VARCHAR(45),
    cpf CHAR(15), -- contei com o "." e "-"
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

CREATE TABLE perguntaFrequente(
	idPerguntaFrequente INT PRIMARY KEY AUTO_INCREMENT, 
    pergunta VARCHAR(400),
    resposta VARCHAR(200)
);

CREATE TABLE tipoArmazen(
	idTipoArmazen INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45)
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

/*INSERT INTO parametro (minTemp, maxTemp, minUmid, maxUmid) VALUES
(, , , ); 
perguntar pra Laís se ela encontrou os parâmetros do silo*/

/*INSERT INTO sensor (modelo, posicao, fkParametro) VALUES
('DHT11', 'Entrada a esquerda', 1),
('DHT11', 'Saida a direita', 1),
('DHT11', 'Saida a esquerda', 1),
('DHT11', 'Entrada', 1),
('DHT11', 'Parede lateral a esquerda da saida', 1),
('DHT11', 'Saida', 1),
('DHT11', 'Entrada a direira', 1); 
verificar com o Edson e com a Laís*/

/*INSERT INTO registro (fkSensor, dht11_temperatura, dht11_umidade, dataHora) VALUES 
(, , , ); 
dados inseridos em tempo real?¹*/

/*INSERT INTO perguntaFrequente (pergunta, resposta) VALUES
(); 
SPRINT 2*/

/*INSERT INTO tipoArmazen (nome) VALUES
('Silo'); 
decidir se vai na tabela armazenamento como fk*/

