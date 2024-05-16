var database = require("../database/config")


function cadastrar(usuario, email, nome, senha, cpf, id){
    var instrucaoSql = `INSERT INTO funcionario (fkempresa, username, senha, email, nomeCompleto, cpf,fkTipoFuncionario) VALUES(${id}, '${usuario}','${senha}','${email}','${nome}', '${cpf}', 2);`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar
}