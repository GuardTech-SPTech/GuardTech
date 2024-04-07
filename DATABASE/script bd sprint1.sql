create database guardtech;
use guardtech;

create table usuario (
idLogin int primary key auto_increment,
username varchar(20),
senha varchar(20),
email varchar(264),
nomeCompleto varchar(45),
cpf char(11),
telefone VARCHAR(13)
);

INSERT INTO usuario VALUES
	(default, 'MarcosMoura', '12345678', 'marcosmoura@gmail.com', 'Marcos Moura Santos Silva', '12345678911', '11999999999'),
	(default, 'AndressaSalles', '123456r8', 'andressasalles@gmail.com', 'Andressa Salles Silva Neres', '12345678912', '11999999999'),
	(default, 'MarinaDias', '12345658', 'marinadias@gmail.com', 'Marina Dias Pereira de Souza', '12345678913', '11999999999'),
	(default, 'LuanaCastro', '12343678', 'luanacastro@gmail.com', '	Luana Castro Teixeira Melo', '12345678914', '11999999999'),
	(default, 'GustavoMello', '12345638', 'gustavo.mello@gmail.com', 'Gustavo Mello Bolvin', '12345678915', '11999999999'),
	(default, 'LucasDouglas', '12345178', 'lucasdouglas@gmail.com', 'Lucas Douglas Jr', '12345678916', '11999999999');


create table empresa (
idEmpresa int primary key auto_increment,
nome varchar(45),
cnpj char(14),
telefone char(11),
cep char(8),
logradouro varchar(45),
numero varchar(10),
bairro varchar(45),
cidade varchar(45),
estado varchar(45)
);

INSERT INTO empresa VALUES
(default, 'CornBox', '12345678911114', '11999999999', '12345670', 'Praça da Sé', '51', 'Jardim das Flores', 'São Paulo', 'São Paulo'),
(default, 'CornArea', '12345678911115', '11999999999', '12345671', 'Praça da Sé', '52', 'Jardim das Rosas', 'São Paulo', 'São Paulo'),
(default, 'CornFit', '12345678911116', '11999999999', '12345672', 'Belém do Pará', '54', 'São Miguél', 'São Paulo', 'São Paulo'),
(default, 'CornInfinity', '12345678911117', '11999999999', '12345673', 'Praça da Sé', '55', 'Jardim das Flores', 'São Paulo', 'São Paulo'),
(default, 'Milho Saudavél', '12345678911118', '11999999999', '12345674', 'Praça da Sé', '56', 'Jardim das Flores', 'São Paulo', 'São Paulo'),
(default, 'Milho LTDA', '12345678911119', '11999999999', '12345675', 'Praça da Sé', '57', 'Jardim das Flores', 'São Paulo', 'São Paulo');

create table Armazem (
idArmazem int primary key auto_increment,
tipo varchar(45),
capacidade varchar(45), -- capacidade em metros quadrados?
descricao varchar(300),
cep char(11),
logradouro varchar(45),
numero varchar(10),
bairro varchar(45),
cidade varchar(45),
estado varchar(45)
);

INSERT INTO Armazem VALUES 
	(default,'Secagem', '1200 m²', 'Armazém para secagem de milho em Mato Grosso', '78000000', 'Rua das Palmeiras', '456', 'Centro', 'Cuiabá', 'MT'),
	(default, 'Estufa', '800 m²', 'Estufa para cultivo de milho em São Paulo', '01000000', 'Avenida Paulista', '123', 'Bela Vista', 'São Paulo', 'SP'),
	(default,'Ambiente Controlado', '1500 m²', 'Armazém com ambiente controlado para armazenamento de milho em Brasília', '70000000', 'Quadra 123', '456', 'Asa Sul', 'Brasília', 'DF'),
	(default, 'Refrigeração', '2500 m²', 'Armazém refrigerado para armazenamento de milho em Salvador', '40000000', 'Avenida da Praia', '789', 'Barra', 'Salvador', 'BA'),
	(default, 'Granel', '1800 m²', 'Armazém para armazenamento de milho a granel em Porto Alegre', '90000000', 'Rua do Porto', '1011', 'Centro', 'Porto Alegre', 'RS');
    

create table Registro (
idRegistro int primary key auto_increment,
lm35_temperatura DECIMAL(3,1),
dht11_umidade DECIMAL(3,1),
dataHora datetime
);

INSERT INTO Registro (lm35_temperatura, dht11_umidade, dataHora) VALUES
	(25.5, 60.2, '2024-04-07 10:00:00'),
	(24.8, 59.8, '2024-04-07 10:15:00'),
	(26.3, 61.5, '2024-04-07 10:30:00'),
	(27.1, 62.8, '2024-04-07 10:45:00'),
	(26.9, 63.2, '2024-04-07 11:00:00'),
	(27.5, 63.8, '2024-04-07 11:15:00'),
	(28.2, 64.5, '2024-04-07 11:30:00'),
	(27.8, 64.1, '2024-04-07 11:45:00'),
	(26.7, 63.0, '2024-04-07 12:00:00'),
	(25.9, 61.8, '2024-04-07 12:15:00');

SELECT * FROM usuario;

SELECT * FROM Armazem;

SELECT * FROM empresa;