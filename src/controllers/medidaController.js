var medidaModel = require("../models/medidaModel");
var armazemModel = require("../models/armazemModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idAquario = req.params.idAquario;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idAquario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idSensor = req.params.idSensor;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idSensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMediaMedidas(req, res){
    var idArmazem = req.params.idArmazem;

    console.log("Recuperando a media dos sensores")

    medidaModel.buscarMediaMedidas(idArmazem).then(function(resultado){
        if(resultado.length > 0) {
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao buscar a media das medidads.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage)
    });
}

function informacoesArmazem(req, res) {
    var idArmazem = req.body.idArmazemServer;

    if (idArmazem == undefined) {
        res.status(400).send("Seu email está indefinida!");
    } else {

        armazemModel.infosArmazem(idArmazem)
            .then(
                function (resultadoArmazem) {
                    console.log(`\nResultados encontrados: ${resultadoArmazem.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoArmazem)}`); // transforma JSON em String

                    if (resultadoArmazem.length == 1) {
                        console.log(resultadoArmazem);

                    armazemModel.buscarSensores(idArmazem)
                      .then((resultadoSensores) => {
                        if(resultadoSensores) {
                            res.json({
                                nomeArmazem: resultadoArmazem[0].nome,
                                enderecoArmazem: resultadoArmazem[0].endereco,
                                tipoArmazem: resultadoArmazem[0].tipo,
                                prazoArmazem: resultadoArmazem[0].prazo,
                                sensores: resultadoSensores
                            });

                          
                        } else {
                            res.statsu(204).json({ aquarios: [] })
                        }

                      })

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMediaMedidas,
    informacoesArmazem

}