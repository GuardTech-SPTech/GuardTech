create database guardtech;
use guardtech;

CREATE TABLE Telefone(
 idTelefone INT PRIMARY KEY AUTO_INCREMENT, 
 ddd CHAR(2) not null,
 numero VARCHAR(9)
);

INSERT INTO Telefone VALUES

	(default, '11','999999999');

CREATE TABLE Endereco(
	idEndereco INT PRIMARY KEY AUTO_INCREMENT, 
    cep CHAR(9),
    numero VARCHAR(5),
    logradouro VARCHAR(45),
    bairro VARCHAR(45),
    estado VARCHAR(30),
    cidade VARCHAR(45)
);

INSERT INTO Endereco VALUES

	(default, '11111111', '99', 'Praça da Sé', 'São José', 'São Paulo', 'São Paulo');

create table Empresa (
idEmpresa int primary key auto_increment,
nome varchar(45),
cnpj char(14),
fkTelefone INT,
CONSTRAINT fkidTelefoneEmpresa FOREIGN KEY(fkTelefone) REFERENCES Telefone(idTelefone),
fkEndereco INT, 
CONSTRAINT fkidEnderecoEmpresa FOREIGN KEY(fkEndereco) REFERENCES Endereco(idEndereco)
);


INSERT INTO Empresa VALUES
(default, 'CornBox', '12345678911114', 1, 1),
(default, 'CornArea', '12345678911115', 1, 1),
(default, 'CornFit', '12345678911116', 1, 1),
(default, 'CornInfinity', '12345678911117', 1, 1),
(default, 'Milho Saudavél', '12345678911118', 1, 1),
(default, 'Milho LTDA', '12345678911119', 1, 1);

create table Usuario (
idLogin int primary key auto_increment,
username varchar(20),
senha varchar(20),
email varchar(264),
nomeCompleto varchar(45),
cpf char(11),
telefone VARCHAR(13),
fkEmpresa INT,
CONSTRAINT fkidEmpresa FOREIGN KEY(fkEmpresa) REFERENCES Empresa(idEmpresa),
fkEndereco INT, 
CONSTRAINT fkEnderecoUsuario FOREIGN KEY(fkEndereco) REFERENCES Endereco(idEndereco) 
);

INSERT INTO Usuario VALUES
	(default, 'MarcosMoura', '12345678', 'marcosmoura@gmail.com', 'Marcos Moura Santos Silva', '12345678911', '11999999999', 1,1),
	(default, 'AndressaSalles', '123456r8', 'andressasalles@gmail.com', 'Andressa Salles Silva Neres', '12345678912', '11999999999',2,1),
	(default, 'MarinaDias', '12345658', 'marinadias@gmail.com', 'Marina Dias Pereira de Souza', '12345678913', '11999999999',3,1),
	(default, 'LuanaCastro', '12343678', 'luanacastro@gmail.com', '	Luana Castro Teixeira Melo', '12345678914', '11999999999',4,1),
	(default, 'GustavoMello', '12345638', 'gustavo.mello@gmail.com', 'Gustavo Mello Bolvin', '12345678915', '11999999999',5,1),
	(default, 'LucasDouglas', '12345178', 'lucasdouglas@gmail.com', 'Lucas Douglas Jr', '12345678916', '11999999999',6,1);

create table Armazem (
idArmazem int primary key auto_increment,
tipo varchar(45),
capacidade varchar(45), -- capacidade em metros quadrados?
descricao varchar(300),
fkEmpresa INT, 
CONSTRAINT fkEmpresaArmazen FOREIGN KEY(fkEmpresa) REFERENCES Empresa(idEmpresa),
fkTelefone INT,
CONSTRAINT fkidTelefoneArmazen FOREIGN KEY(fkTelefone) REFERENCES Telefone(idTelefone),
fkEndereco INT, 
CONSTRAINT fkienderecoArmazen FOREIGN KEY(fkEndereco) REFERENCES Endereco(idEndereco)
);

INSERT INTO Armazem VALUES 
	(default,'Secagem', '1200 m²', 'Armazém para secagem de milho em Mato Grosso', 1,1,1),
	(default, 'Estufa', '800 m²', 'Estufa para cultivo de milho em São Paulo', 2,1,1),
	(default,'Ambiente Controlado', '1500 m²', 'Armazém com ambiente controlado para armazenamento de milho em Brasília', 3,1,1),
	(default, 'Refrigeração', '2500 m²', 'Armazém refrigerado para armazenamento de milho em Salvador', 4,1,1),
	(default, 'Granel', '1800 m²', 'Armazém para armazenamento de milho a granel em Porto Alegre', 5,1,1);
    

create table Registro (
idRegistro int primary key auto_increment,
lm35_temperatura DECIMAL(3,1),
dht11_umidade DECIMAL(3,1),
dataHora datetime,
fkArmazen INT, 
CONSTRAINT fkidArmazen FOREIGN KEY(fkArmazen) REFERENCES Armazem(idArmazem)
);


SELECT empresa.nome, username FROM Empresa JOIN usuario ON idEmpresa = fkEmpresa;

SELECT * FROM Armazem;

SELECT * FROM empresa;