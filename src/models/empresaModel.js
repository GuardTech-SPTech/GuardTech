var database = require("../database/config")


function cadastrar(nome, cnpj){
    var instrucaoSql = `INSERT empresa (nome, cnpj) VALUES('${nome}', '${cnpj}');`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);

}


module.exports = {
    cadastrar
}