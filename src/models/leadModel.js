var database = require("../database/config")

function cadastrarLead (nome,email, mensagem){
    var instrucaoSQL = `
    INSERT INTO leads (nome, email, mensagem) VALUES
    ('${nome}', '${email}', '${mensagem}');
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

module.exports = {
  cadastrarLead
}