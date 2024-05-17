var enderecoModel = require("../models/enderecoModel");

function cadastrar(req, res){
    var idEmpresa  = req.body.idEmpresaServer
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var logradouro = req.body.logradouroSever
    var bairro = req.body.bairroServer
    var cidade = req.body.cidadeServer
    var estado = req.body.estadoServer
    var complemento = req.body.complementoServer

    enderecoModel.cadastrar(cep, numero, logradouro, bairro, estado, cidade, complemento, idEmpresa)
}


module.exports = {
    cadastrar
}