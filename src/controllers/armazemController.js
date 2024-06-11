var armazemModel = require("../models/armazemModel");

function buscarArmazemPorEmpresa(req, res) {

  console.log(req.params)
  var idEmpresa = req.params.empresaId;

  armazemModel.buscarArmazemPorEmpresa(idEmpresa).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
      console.log(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os armazens: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarArmazemPorEmpresatoPerfil(req, res) {

  console.log(req.params)
  var idEmpresa = req.params.empresaId;

  armazemModel.buscarArmazemporEmpresatoPerfil(idEmpresa).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
      console.log(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os armazens para o perfil: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function cadastrar(req, res) {
  var descricao = req.body.descricao;
  var idUsuario = req.body.idUsuario;

  if (descricao == undefined) {
    res.status(400).send("descricao está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("idUsuario está undefined!");
  } else {


    armazemModel.cadastrar(descricao, idUsuario)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  buscarArmazemPorEmpresa,
  buscarArmazemPorEmpresatoPerfil,
  cadastrar
}