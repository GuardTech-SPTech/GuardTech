var database = require("../database/config");

function buscarArmazemPorEmpresa(empresaId) {

  var instrucaoSql = ` SELECT * from armazem as a 
  join endereco as e on a.fkEndereco = e.idEndereco 
  JOIN tipoArmazem as ta on a.fkTipoArmazenamento = ta.idTipoArmazem 
  WHERE a.fkEmpresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function infosArmazem(idArmazem) {

  var instrucaoSql = `
  select armazem.descricao as nome, concat(endereco.logradouro, ', Nº', endereco.numero)as endereco, tipoArmazem.nome as tipo, prazo.tipoPrazo as prazo from armazem 
join endereco 
on armazem.fkEndereco = endereco.idEndereco
join tipoArmazem
on armazem.fkTipoArmazenamento = tipoArmazem.idTipoArmazem
join prazo 
on tipoArmazem.fkPrazo = prazo.idPrazo
where armazem.idArmazem = ${idArmazem}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarSensores(idArmazem) {
  var instrucaoSql = `select * from sensor where fkArmazem = ${idArmazem}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarArmazemPorEmpresa,
  infosArmazem,
  buscarSensores
}
