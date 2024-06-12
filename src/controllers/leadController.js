var leadoModel = require("../models/leadModel")

function cadastrarLead(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var mensagem = req.body.mensagemServer;

    leadoModel.cadastrarLead(nome, email, mensagem).then(function (resposta) {
        res.status(200).send("Lead cadastrado com sucesso!");
    }).catch(function (erro) {
        console.log("erro no controlles", erro)
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
  cadastrarLead
}