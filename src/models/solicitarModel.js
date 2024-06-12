var database = require("../database/config");


function cadastrarEmail(idFuncionario, idEmpresa, capacidade, descricao, cep, numero, bairro, cidade, complemento, tipo, obs){
    var instrucaoSql = `INSERT INTO email (fkFuncionario, fkEmpresa, dtEmail, capacidadeToneladas, descricao, cep, numero, bairro, cidade, complemento, tipoArmazem, observacoes) VALUES
        ('${idFuncionario}', '${idEmpresa}', now() ,'${capacidade}','${descricao}','${cep}','${numero}','${bairro}', '${cidade}', '${complemento}', '${tipo}', '${obs}');`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql)

        database.executar(instrucaoSql)

}

module.exports = {
    cadastrarEmail
}