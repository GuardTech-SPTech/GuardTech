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

function buscarMedidasAno(idSensor) {
    var instrucaoSql = `SELECT 
    MONTH(dataHora) AS mes,
    AVG(dht11_temperatura) AS media_temperatura,
    AVG(dht11_umidade) AS media_umidade
FROM registro
WHERE YEAR(dataHora) = (SELECT YEAR(CURDATE()))
AND fkSensor = ${idSensor}
GROUP BY MONTH(dataHora)
ORDER BY mes;
`


    console.log("Executando a instrução SQL:", instrucaoSql)

    return database.executar(instrucaoSql)
}

function buscarMedidasMes(idSensor) {
    var instrucaoSql = `SELECT 
    (WEEK(dataHora, 0) - WEEK(DATE_SUB(dataHora, INTERVAL DAYOFMONTH(dataHora)-1 DAY), 1) + 1) AS semana_do_mes,
    AVG(dht11_temperatura) AS media_temperatura,
    AVG(dht11_umidade) AS media_umidade
FROM registro
WHERE YEAR(dataHora) = 2024
  AND MONTH(dataHora) = ${idSensor }
  AND fkSensor = 1
GROUP BY semana_do_mes
ORDER BY semana_do_mes;
`

    console.log("Executando a instrução SQL:", instrucaoSql)

    return database.executar(instrucaoSql)
}

function buscarMedidasSemana(idSensor) {
    var instrucaoSql = `SELECT 
    DAYOFWEEK(dataHora) - 1 AS dia_da_semana_numero,
    AVG(dht11_temperatura) AS media_temperatura,
    AVG(dht11_umidade) AS media_umidade
FROM 
    registro
WHERE 
    fkSensor = ${idSensor}
GROUP BY 
    dia_da_semana_numero
ORDER BY 
    dia_da_semana_numero;
`

    console.log("Executando a instrução SQL:", instrucaoSql)

    return database.executar(instrucaoSql)
}

function buscarMedidasDia(idSensor) {
    var instrucaoSql = `SELECT 
    (HOUR(dataHora) DIV 3) * 3 AS intervalo,  -- Divide as horas em intervalos de 3 horas e normaliza para o início do intervalo
    AVG(dht11_temperatura) AS media_temperatura,
    AVG(dht11_umidade) AS media_umidade
FROM 
    registro
WHERE 
    YEAR(dataHora) = YEAR(CURDATE())
    AND MONTH(dataHora) = MONTH(CURDATE())
    AND DAY(dataHora) = DAY(CURDATE())
    AND fkSensor = ${idSensor}
GROUP BY 
    (HOUR(dataHora) DIV 3) * 3
ORDER BY 
    intervalo;
`;


    console.log("Executando a instrução SQL:", instrucaoSql)

    return database.executar(instrucaoSql)
}







module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMediaMedidas,
    buscarMedidasDia,
    buscarMedidasSemana,
    buscarMedidasMes,
    buscarMedidasAno
}
