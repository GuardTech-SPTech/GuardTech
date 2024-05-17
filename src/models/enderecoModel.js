var database = require("../database/config");


function cadastrar(cep, numero, logradouro, bairro, estado, cidade, complemento, fkEmpresa){
    var instrucaoSql = `INSERT INTO endereco (cep, numero, logradouro, bairro, estado, cidade, complemento, fkEmpresa) VALUES
        ('${cep}', '${numero}','${logradouro}','${bairro}','${estado}','${cidade}','${complemento}','${fkEmpresa}');`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql)

        database.executar(instrucaoSql)

}



module.exports = {
    cadastrar
}