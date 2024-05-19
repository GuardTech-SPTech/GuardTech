var database = require("../database/config");

function buscarArmazemPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM armazem JOIN sensor on armazem.idarmazem = sensor.fkarmazem WHERE fkEmpresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, descricao) {
  
  var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
    buscarArmazemPorEmpresa,
}
