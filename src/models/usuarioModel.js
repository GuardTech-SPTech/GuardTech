var database = require("../database/config");

function autenticar(nome, email, senha) {
    var instrucaoSql = `
    SELECT e.nome AS 'empresa',
nomeCompleto, idFuncionario, idEmpresa as empresaId, username, email,  fkTipoFuncionario 
FROM funcionario JOIN empresa as e ON funcionario.fkEmpresa = e.idEmpresa 
WHERE funcionario.email = '${email}' AND funcionario.senha = '${senha}' AND username = '${nome}';
    `;

    console.log("Executando a instrução sql", instrucaoSql)
    return database.executar(instrucaoSql);
}

function cadastrarFuncionario(nome, fkEmpresa, username, email, cpf, senha, tipoFuncionario) {
    const instrucaoSql = `
        INSERT INTO funcionario (nomeCompleto, fkEmpresa, username, email, cpf, senha, fktipoFuncionario)
        VALUES ('${nome}', ${fkEmpresa}, '${username}', '${email}', '${cpf}', '${senha}', '${tipoFuncionario}');
    `;

    console.log("Executando a instrução sql:", instrucaoSql )
    return database.executar(instrucaoSql);
}

function mostrarFuncionario(idEmpresa) {

    var instrucaoSql = `
    SELECT * FROM funcionario 
    JOIN tipoFuncionario 
    ON funcionario.fkTipoFuncionario = tipoFuncionario.idTipoFuncionario 
    WHERE fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando", instrucaoSql)
    return database.executar(instrucaoSql);
}



module.exports = {
    autenticar,
    cadastrarFuncionario,
    mostrarFuncionario
};
