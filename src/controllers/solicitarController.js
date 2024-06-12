var solicitarModel = require("../models/solicitarModel"); // nao arrumei

function cadastrarEmail(req, res) {
    var idFuncionario = req.body.idEmpresaServer;
    var idEmpresa = req.body.idFuncionarioServer;
    var capacidade = req.body.capacidadeServer;
    var descricao = req.body.descricaoServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var complemento = req.body.complementoServer;
    var tipo = req.body.tipoServer;
    var obs = req.body.obsServer;
   


    solicitarModel.cadastrarEmail(idFuncionario, idEmpresa, capacidade, descricao, cep, numero, bairro, cidade, complemento, tipo, obs)
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
    cadastrarEmail
}