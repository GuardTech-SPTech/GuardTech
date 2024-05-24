var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    FROM medida
                    WHERE fk_aquario = ${idAquario}
                    ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idSensor) {
    var instrucaoSql = `SELECT 
    dht11_temperatura as temperatura, 
    dht11_umidade as umidade,
                    DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico, 
                    fkSensor 
                    FROM registro WHERE fkSensor = ${idSensor}
                ORDER BY idRegistro DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMediaMedidas(idArmazem) {
    var instrucaoSql = `SELECT 
    a.idArmazem, 
    s.idSensor, 
    ROUND(AVG(r.dht11_temperatura), 2) AS media_temperatura,
    ROUND(AVG(r.dht11_umidade), 2) AS media_umidade,
    TIME(r.dataHora) AS horario
FROM 
    armazem a
JOIN 
    sensor s ON a.idArmazem = s.fkArmazem
JOIN 
    registro r ON s.idSensor = r.fkSensor
JOIN 
    (SELECT fkSensor, MAX(dataHora) AS ultima_dataHora FROM registro GROUP BY fkSensor) ultimos_registros 
    ON r.fkSensor = ultimos_registros.fkSensor AND r.dataHora = ultimos_registros.ultima_dataHora
WHERE 
    a.idArmazem = ${idArmazem}
GROUP BY 
    a.idArmazem, s.idSensor, horario;

`

    console.log("Executando a instrução SQL:" + instrucaoSql)

    return database.executar(instrucaoSql)
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMediaMedidas
}
