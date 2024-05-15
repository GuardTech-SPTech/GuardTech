CREATE DATABASE guardtech;

USE guardtech;

-- TABELAS CRIADAS 
CREATE TABLE empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45),
    cnpj CHAR(14)
); 

-- INSERTS DAS TABELAS 
INSERT INTO empresa VALUES 
(default,'AgroArmazéns', '12345678910001'),
(default,'GrãoSafra', '12345678920001'),
(default,'ProtegeMilho', '12345678930001'),
(default,'MilhoGuarda', '12345678940001'),
(default,'LogísticaMilho', '12345678950001');

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

CREATE TABLE prazo (
	idPrazo INT PRIMARY KEY AUTO_INCREMENT,
    tipoPrazo VARCHAR(45),
    CONSTRAINT chkTipoPrazo CHECK (tipoPrazo IN('curto','longo')) 
);

INSERT INTO prazo (tipoPrazo) VALUES
('curto'),
('longo');


CREATE TABLE parametro(
	idParametro INT PRIMARY KEY AUTO_INCREMENT, 
    minTemp DECIMAL (4,2),
    maxTemp DECIMAL (4,2),
    maxUmid DECIMAL (4,2)
);

INSERT INTO parametro (minTemp, maxTemp, maxUmid) VALUES
(5, 35, 20); 

CREATE TABLE tipoArmazem(
	idTipoArmazem INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(45),
    fkPrazo INT,
    CONSTRAINT fktipoArmazemPrazo FOREIGN KEY (fkPrazo) REFERENCES prazo(idPrazo),
    fkParametro INT,
    CONSTRAINT fkTipoArmazemParametro FOREIGN KEY (fkParametro) REFERENCES parametro(idParametro)
);


INSERT INTO tipoArmazem (nome, fkPrazo) VALUES
('Silo', 1); 

INSERT INTO tipoArmazem (nome, fkPrazo) VALUES
('Silo', 2);

CREATE TABLE armazem(
	idArmazem INT PRIMARY KEY AUTO_INCREMENT,
    capacidade DECIMAL (6,2),
    descricao VARCHAR(45),
    fkEmpresa INT, 
    CONSTRAINT fkArmazemempresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    fkEndereco INT, 
    CONSTRAINT fkArmazemEndereco FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco),
    fkTipoArmazenamento INT,
    CONSTRAINT fkArmazemTipoArmazenamento FOREIGN KEY (fkTipoArmazenamento) REFERENCES tipoArmazem(idTipoArmazem)
);

INSERT INTO armazem (capacidade, descricao, fkEmpresa, fkEndereco, fkTipoArmazenamento) VALUES
(1000, null, 1, 6, 2),
(2200, null, 2, 7, 2),
(4000, null, 3, 8, 2),
(5550, null, 4, 9, 2),
(1000, null, 5, 10, 2),
(3200, null, 1, 11, 2),
(8900, null, 2, 12, 2);

CREATE TABLE telefone(
	idTelefone INT PRIMARY KEY AUTO_INCREMENT, 
    ddd CHAR(2),
    prefixo CHAR(5),
    sufixo CHAR(4),
    fkEmpresa INT,
    CONSTRAINT fkTelefoneEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    fkArmazem INT, 
    CONSTRAINT fkTelefoneArmazem FOREIGN KEY (fkArmazem) REFERENCES armazem(idArmazem)
);

INSERT INTO telefone (ddd, prefixo, sufixo, fkEmpresa, fkArmazem) VALUES 
('11', '95656', '1111', 1, 1),
('11', '94545', '2222', 2, 2),
('31', '93434', '3333', 3, 3),
('31', '92323', '4444', 4, 4),
('11', '91212', '5555', 5, 5),
('11', '98989', '8888', 1, 6),
('11', '99898', '9999', 2, 7);


CREATE TABLE tipoFuncionario(
	idTipoFuncionario INT PRIMARY KEY AUTO_INCREMENT, 
    funcao VARCHAR(45)
);


INSERT INTO tipoFuncionario (funcao) VALUES
('Operador'),
('Administrador');


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

INSERT INTO funcionario (idFuncionario, fkEmpresa, username, senha, email, nomeCompleto, cpf, fkTipoFuncionario) VALUES 
(1, 1, 'aghataDiniz', 'diniz123', 'diniz.aghata@gmail.com', 'Aghata Souza Diniz', '121.212.121-21', 1),
(2, 2, 'pereiraAlvaro', 'pereira123', 'pereira.alvaro@gmail.com', 'Alvaro Pereira Silva', '232.323.232-32', 1),
(3, 3, 'camilaCasi', 'casimiro123', 'casimiro.camila@gmail.com', 'Camila Casimiro Domingues', '343.434.343-43', 2),
(4, 4, 'letCordeiro', 'cordeiro123', 'cordeiro.leticia@gmail.com', 'Leticia Costa Cordeiro', '454.545.454-54', 2),
(5, 5, 'vihSilva', 'silva123', 'silva.vitoria@gmail.com', 'Vitória Serqueira Silva', '565.656.565-65', 1);

CREATE TABLE sensor(
	idSensor INT PRIMARY KEY AUTO_INCREMENT, 
    modelo VARCHAR(45),
    posicao VARCHAR(45),
	fkArmazem INT,
    CONSTRAINT fkSensorArmazem FOREIGN KEY (fkArmazem) REFERENCES armazem(idArmazem)
);

INSERT INTO sensor (modelo, posicao, idSensor, fkArmazem) VALUES
('DHT11', 'Entrada a esquerda', 1, 1),
('DHT11', 'Saida a direita', 2, 2),
('DHT11', 'Saida a esquerda', 10, 3),
('DHT11', 'Entrada', 4, 4),
('DHT11', 'Parede lateral a esquerda da saida', 5, 5),
('DHT11', 'Saida', 6, 6),
('DHT11', 'Entrada a direira', 7, 7); 

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

INSERT INTO perguntaFrequente (pergunta, resposta) VALUES
('Meu sensor parou de funcionar! E agora?', 'Comunique a nossa equipe para que possamos fazer o reparo!'),
('Como visualizar os dados capturados?', 'Os dados capturados são armazenados e enviados para a Dashboard que está inserida em sua plataforma web!'),
('Como posso entrar em contato com a GuardTech?', 'Basta você enviar um email para o endereço guardtech.sptech@gmail.com que a nossa equipe de especialistas irá retornar o contato');

CREATE TABLE leads(
	idEmail INT PRIMARY KEY AUTO_INCREMENT,
    endereco VARCHAR(256),
    mensagem VARCHAR(900)
);

INSERT INTO leads (endereco, mensagem) VALUES 
('adm@pipotech.com', 'Olá, godtaria de receber um orçamento'),
('gestao.tech@milho.com', 'Olá, godtaria de receber um orçamento'),
('comercial@plantmilho.com', 'Olá, godtaria de receber um orçamento'),
('agro@agrotech.com', 'Olá, godtaria de receber um orçamento');

SHOW TABLES;



-- SELECT'S
SHOW TABLES;
SELECT * FROM armazem;
SELECT * FROM empresa;
SELECT * FROM endereco;
SELECT * FROM funcionario;
SELECT * FROM leads;
SELECT * FROM parametro;
SELECT * FROM perguntafrequente;
SELECT * FROM prazo;
SELECT * FROM registro;
SELECT * FROM sensor;
SELECT * FROM tipofuncionario;
SELECT * FROM telefone;
SELECT * FROM tipoArmazem;

-- JOIN EMPRESA - ARMAZEM - REGISTRO - SENSOR
SELECT empresa.idEmpresa AS 'ID Empresa',
empresa.nome AS 'Nome da empresa',
empresa.cnpj AS CNPJ,
armazem.idArmazem AS 'ID Armazem',
armazem.capacidadeToneladas AS Capacidade,
registro.idRegistro AS 'ID Registro',
registro.dht11_temperatura AS Temperatura,
registro.dht11_umidade AS Umidade,
registro.dataHora AS Momento,
sensor.idSensor AS 'ID Sensor',
sensor.modelo AS Modelo,
sensor.posicao AS 'Posição'
FROM empresa 
LEFT JOIN armazem 
ON armazem.fkEmpresa = empresa.idEmpresa
LEFT JOIN sensor 
ON armazem.idArmazem = sensor.fkArmazem
LEFT JOIN registro 
ON registro.fkSensor = sensor.idSensor;

-- JOIN COM ARMAZEM - TIPOARMAZEM - PRAZO - ENDERECO
SELECT armazem.idArmazem AS 'ID Armazem',
armazem.capacidadeToneladas AS Capacidade,
tipo.idTipoArmazem AS 'ID Tipo Armazem',
tipo.nome AS 'Nome do armazem',
prazo.tipoPrazo AS Prazo,
endereco.cep AS CEP,
endereco.numero AS 'Número',
endereco.logradouro AS Logradouro,
endereco.bairro AS Bairro,
endereco.estado AS Estado,
endereco.cidade AS Cidade,
endereco.complemento AS Complemento
FROM armazem 
LEFT JOIN tipoarmazem AS tipo
ON armazem.fkTipoArmazenamento = tipo.idTipoArmazem
LEFT JOIN prazo
ON tipo.fkPrazo = prazo.idPrazo
LEFT JOIN endereco 
ON armazem.fkEndereco = endereco.idEndereco;


-- JOIN EMPRESA - FUNCIONÁRIO -  TIPOFUNCIONÁRIO
SELECT empresa.idEmpresa AS 'ID Empresa',
empresa.nome AS 'Nome da empresa', 
empresa.cnpj AS CNPJ,
func.idFuncionario AS 'ID Funcionário',
func.nomeCompleto AS 'Nome funcionário',
func.email AS 'Email funcionário',
func.cpf AS CPF,
tipo.funcao AS 'Função'
FROM empresa JOIN funcionario AS func
ON func.fkEmpresa = empresa.idEmpresa
JOIN tipoFuncionario AS tipo
ON func.fkTipoFuncionario = tipo.idTipoFuncionario;


-- JOIN FUNCIONÁRIO - TIPOFUNCIONÁRIO - SENHA - EMAIL - USERNAME - CPF
SELECT func.idFuncionario AS 'ID Funcionário',
func.nomeCompleto AS 'Nome funcionário',
tipo.funcao AS 'Função',
func.email AS Email,
func.cpf AS CPF,
func.username AS UserName,
func.senha AS 'Senha de acesso'
FROM funcionario AS func
JOIN tipoFuncionario AS tipo
ON func.fkTipoFuncionario = tipo.idTipoFuncionario;


-- SELECT COM NOME - EMAIL - SENHA FROM EMPRESAS
SELECT empresa.nome AS 'Nome Empresa',
cnpj as 'CNPJ Empresa'
FROM empresa;


-- JOIN - FUNCIONARIO - TIPO 
SELECT func.idFuncionario AS 'ID Funcionário',
func.nomeCompleto AS 'Nome',
func.cpf AS CPF,
func.email AS Email,
func.username AS UserName,
tipo.funcao AS 'Função'
FROM funcionario AS func
JOIN tipofuncionario AS tipo
ON func.fkTipoFuncionario = tipo.idTipoFuncionario;


-- JOIN - ARMAZEM - SENSOR - REGISTRO 
SELECT armazem.idArmazem AS 'ID Armazem',
armazem.capacidadeToneladas AS Capacidade,
armazem.descricao AS 'Descrição',
sensor.idSensor AS 'ID Sensor',
sensor.modelo AS Modelo,
sensor.posicao AS 'Posição',
registro.dataHora AS 'Momento',
registro.dht11_temperatura AS Temperatura,
registro.dht11_umidade AS Umidade
FROM armazem LEFT JOIN sensor
ON sensor.fkArmazem = armazem.idArmazem
LEFT JOIN registro
ON registro.fkSensor = sensor.idSensor;


-- JOIN - ARMAZEM - TIPO - PARAMETRO
SELECT armazem.idArmazem AS 'ID Armazem',
armazem.capacidadeToneladas AS Capacidade,
armazem.descricao AS 'Descrição',
tipo.idTipoArmazem AS 'ID Tipo Armazem',
tipo.nome AS 'Nome do armazem',
parametro.minTemp AS 'Temperatura minima',
parametro.maxTemp AS 'Temperatura máxima',
parametro.maxUmid AS 'Umidade máxima'
FROM armazem LEFT JOIN tipoArmazem AS tipo
ON armazem.fkTipoArmazenamento = tipo.idTipoArmazem
LEFT JOIN parametro 
ON tipo.fkParametro = parametro.idParametro;


-- JOIN - EMPRESA - ENDEREÇO - ARMAZEM - TIPOARMAZEM
SELECT empresa.idEmpresa AS 'ID Empresa',
empresa.nome AS 'Nome da empresa', 
empresa.cnpj AS CNPJ,
endereco.cep AS CEP,
endereco.numero AS 'Número',
endereco.logradouro AS Logradouro,    
endereco.bairro AS Bairro,
endereco.estado AS Estado,
endereco.cidade AS Cidade,
endereco.complemento AS Complemento,
armazem.idArmazem AS 'ID Armazem',
armazem.capacidadeToneladas AS Capacidade,
armazem.descricao AS 'Descrição',
tipo.nome AS 'Nome do armazem'
FROM empresa 
JOIN endereco 
ON endereco.fkEmpresa = empresa.idEmpresa
JOIN armazem 
ON armazem.fkEndereco = endereco.idEndereco
JOIN tipoArmazem AS tipo 
ON armazem.fkTipoArmazenamento = tipo.idTipoArmazem;
