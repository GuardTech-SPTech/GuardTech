var adminModel = require("../models/adminModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    // var nome = req.body.nomeServer;
    // var cep = req.body.cepServer;
    // var numero = req.body.numeroServer;
    // var logradouro = req.body.logradouroServer;
    // var bairro = req.body.bairroServer;
    // var cidade = req.body.cidadeServer;
    // var cnpj = req.body.cnpjServer;

    var usuario = req.body.usuarioServer
    var email = req.body.emailServer
    var nome = req.body.nomeCompletoServer
    var senha = req.body.senhaServer
    var cpf = req.body.cpfServer
    var id = req.body.idEmpresaServer
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        adminModel.cadastrar(usuario, email, nome, senha, cpf, id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


module.exports = {
    cadastrar
}