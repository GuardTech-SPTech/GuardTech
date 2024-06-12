var alertas = [];

function obterdados(idSensor) {
    fetch(`/medidas/tempo-real/${idSensor}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idSensor);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idSensor} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function obterMediaHora(idSensor) {
    fetch(`/medidas/mediaHora/${idSensor}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    // alertar(resposta, idSensor);
                    console.log(resposta)
                    plotarMedia(resposta, idSensor)
                });
            } else {
                console.error(`Nenhum média ${idSensor} `);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

const tipoArmazem = sessionStorage.getItem('PRAZO_ARMAZEM')

    const parametrosArmazemCurto = {
        temperaturaIdeal: 14,
        temperaturaAlerta: 18,
        temperaturaPerigo: 18,
        umidadeIdeal: 18,
        umidadeAlerta: 25,
        umidadePerigo: 25
    }

    const parametrosArmazemLongo = {
        temperaturaIdeal: 10,
        temperaturaAlerta: 14,
        temperaturaPerigo: 14,
        umidadeIdeal: 13,
        umidadeAlerta: 20,
        umidadePerigo: 20
    }

    let parametroIdealTemperatura = 0
    let parametroIdealUmidade = 0
    let parametroAlertaTemperatura = 0
    let parametroAlertaUmidade = 0

    if (tipoArmazem == 'curto') {
        parametroIdealTemperatura = parametrosArmazemCurto.temperaturaIdeal
        parametroIdealUmidade = parametrosArmazemCurto.umidadeIdeal
        parametroAlertaTemperatura = parametrosArmazemCurto.temperaturaAlerta
        parametroAlertaUmidade = parametrosArmazemCurto.umidadeAlerta

    } else if (tipoArmazem == 'longo') {
        parametroIdealTemperatura = parametrosArmazemLongo.temperaturaIdeal
        parametroIdealUmidade = parametrosArmazemLongo.umidadeIdeal
        parametroAlertaTemperatura = parametrosArmazemLongo.temperaturaAlerta
        parametroAlertaUmidade = parametrosArmazemLongo.umidadeAlerta
    }

function plotarMedia(resposta, idSensor) {
    let sensorEscolhido = sessionStorage.getItem("SENSOR_SELECIONADO")
    if (sensorEscolhido == idSensor) {
        let somaTemperatura = resposta[0].somaTemperatura
        let somaUmidade = resposta[0].SomaUmidade
        let quantidadeDados = resposta[0].quantidadeDeDados
        let mediaTemperatura = (somaTemperatura / quantidadeDados).toFixed(2)
        let mediaUmidade = (somaUmidade / quantidadeDados).toFixed(2)

        const mediaTemp = document.getElementById('mediaTemp')
        const mediaUmi = document.getElementById('mediaUmi')
        const alerta_temperatura = document.getElementById('cor_temp')
        const alerta_umidade = document.getElementById('cor_umi')
        mediaTemp.innerHTML = `${mediaTemperatura}ºC`
        mediaUmi.innerHTML = `${mediaUmidade}%`

        if (mediaTemperatura <= 10) {
            alerta_temperatura.style.backgroundColor = '#c4ee8e'
        } else if (mediaTemperatura <= 18) {
            alerta_temperatura.style.backgroundColor = '#eccf4d'
        } else {
            alerta_temperatura.style.backgroundColor = '#e66666'
        }

        if (mediaUmidade <= parametroIdealUmidade) {
            alerta_umidade.style.backgroundColor = '#c4ee8e'
        } else if (mediaUmidade <= parametroAlertaUmidade) {
            alerta_umidade.style.backgroundColor = '#eccf4d'
        } else {
            alerta_umidade.style.backgroundColor = '#e66666'
        }
    }
}

function alertar(resposta, idSensor) {

    let sensorEscolhido = sessionStorage.getItem("SENSOR_SELECIONADO")
    var temp = resposta[0].temperatura;
    var umi = resposta[0].umidade;

    console.log(temp, umi)
    console.log(sensorEscolhido)
    if (document.getElementById(`indicador_temperatura_${idSensor}`) != null) {
        document.getElementById(`indicador_temperatura_${idSensor}`).innerHTML = temp + "°C";
    }
    if (document.getElementById(`indicador_umidade_${idSensor}`) != null) {
        document.getElementById(`indicador_umidade_${idSensor}`).innerHTML = umi + "%";
    }

    if (document.getElementById(`temp_atual`) != null && idSensor == sensorEscolhido) {
        document.getElementById(`temp_atual`).innerHTML = temp + "°C";
    }
    if (document.getElementById(`umidade_atual`) != null && idSensor == sensorEscolhido) {
        document.getElementById(`umidade_atual`).innerHTML = umi + "%";
    }


    let alerta_temperatura = document.getElementById(`indicador_temperatura_${idSensor}`)
    let indicador_temperatura = document.getElementById(`indicador_temp`)

    if (alerta_temperatura) {
        if (temp <= 14) {
            alerta_temperatura.style.backgroundColor = '#c4ee8e'
        } else if (temp <= 18) {
            alerta_temperatura.style.backgroundColor = '#eccf4d'
        } else {
            alerta_temperatura.style.backgroundColor = '#e66666'
        }
    } else if (indicador_temperatura && idSensor == sensorEscolhido) {
        if (temp <= parametroIdealTemperatura) {
            indicador_temperatura.style.backgroundColor = '#c4ee8e'
        } else if (temp <= parametroAlertaTemperatura) {
            indicador_temperatura.style.backgroundColor = '#eccf4d'
        } else {
            indicador_temperatura.style.backgroundColor = '#e66666'
        }
    }


    let alerta_umidade = document.getElementById(`indicador_umidade_${idSensor}`)
    let indicador_umidade = document.getElementById(`indicador_umidade`)

    if (alerta_umidade) {
        if (umi <= 18) {
            alerta_umidade.style.backgroundColor = '#c4ee8e'
        } else if (umi <= 25) {
            alerta_umidade.style.backgroundColor = '#eccf4d'
        } else {
            alerta_umidade.style.backgroundColor = '#e66666'
        }
    } else if (indicador_umidade && idSensor == sensorEscolhido) {
        if (umi <= parametroIdealUmidade) {
            indicador_umidade.style.backgroundColor = '#c4ee8e'
        } else if (umi <= parametroAlertaUmidade) {
            indicador_umidade.style.backgroundColor = '#eccf4d'
        } else {
            indicador_umidade.style.backgroundColor = '#e66666'
        }
    }

    AdicionarDadoNoGrafico(resposta, idSensor)
}



function AdicionarDadoNoGrafico(resposta, idSensor) {

    let sensorEscolhido = sessionStorage.getItem("SENSOR_SELECIONADO")

    if(sensorEscolhido == idSensor) {
        const temperatura = resposta[0].temperatura
        const umidade = resposta[0].umidade
        const momento = resposta[0].momento_grafico
    
        grafico_temperatura.data.labels.push(momento)
        grafico_temperatura.data.datasets[0].data.push(temperatura)
        
        grafico_umidade.data.labels.push(momento)
        grafico_umidade.data.datasets[0].data.push(umidade)

        if(grafico_temperatura.data.labels.length > 7) {
            grafico_temperatura.data.labels.splice(0,1)
            grafico_temperatura.data.datasets[0].data.splice(0,1)

            grafico_umidade.data.labels.splice(0,1)
            grafico_umidade.data.datasets[0].data.splice(0,1)
        }

        grafico_umidade.update()
        grafico_temperatura.update()

    }

}

function exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idAquario == idAquario);

    if (indice >= 0) {
        alertas[indice] = { idAquario, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idAquario, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
}

function removerAlerta(idAquario) {
    alertas = alertas.filter(item => item.idAquario != idAquario);
    exibirCards();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function atualizacaoPeriodica() {
    JSON.parse(sessionStorage.ARMAZENS).forEach(item => {
        obterdados(item.idSensor)
        obterMediaHora(item.idSensor)
    });
    setTimeout(atualizacaoPeriodica, 5000);
}


<<<<<<< HEAD



=======
<<<<<<< HEAD

function obterMediaDados(idArmazem){
    fetch(`/medidas/media/${idArmazem}`)
    .then(resposta => {
        if (resposta.status == 200) {
            resposta.json().then(resposta => {

                console.log(sessionStorage.ARMAZENS)

                console.log(`media dos dados recebidos: ${JSON.stringify(resposta)}`);

                alertarMedias(resposta, idArmazem);
            });
        } else {
            console.error(`Nenhum dado encontrado para o id ${idArmazem} ou erro na API`);
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
    });
}

function alertarMedias(resposta) {
    console.log(resposta)
   

    var temp = resposta[0].media_temperatura;
    console.log(temp)
    var umi = resposta[0].media_umidade;
    console.log(umi);
    var moment = resposta[0].horario

    if (document.getElementById(`temp_atual`) != null) {
        document.getElementById(`temp_atual`).innerHTML = temp + "°C";
    }
    if (document.getElementById(`umidade_atual`) != null) {
        document.getElementById(`umidade_atual`).innerHTML = umi + "°%";
    }

<<<<<<< HEAD
    AdicionarDadoDeUmidade(umi);
    AdicionarDadoDeTemperatura(temp);
=======
    AdicionarDadoDeUmidade(umi, moment);
    AdicionarDadoDeTemperatura(temp, moment)
>>>>>>> d82c5d1a9fdf177a1a5ab1076b2ee32205574b1e
}


function atualizacaoPeriodicaMedia() {
    JSON.parse(sessionStorage.ARMAZENS).forEach(item => {

        obterMediaDados(item.idArmazem)
    });
    setTimeout(atualizacaoPeriodicaMedia, 30000);
}







let medumidade = 0


=======
>>>>>>> 40d08ba6a873dc76ca4a51835d58f3ac03cdbf4b
>>>>>>> 8784dc9747c11b9664448fb4e6131deeecc8a975
