var empresaModel = require("../models/empresaModel");
let ultimoIdInseridoNoBanco 
function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;

    // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
    empresaModel.cadastrar(nome, cnpj)
        .then(
            function (resultado) {
                res.json(resultado);
                console.log('ID do último registro inserido:', resultado.insertId);
                ultimoIdInseridoNoBanco = resultado.insertId
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