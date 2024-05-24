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
    
    function alertar(resposta, idSensor) {

    var temp = resposta[0].temperatura;
    var umi = resposta[0].umidade;
    var card;
    if (document.getElementById(`temperatura_armazem_${idSensor}`) != null) {
        document.getElementById(`temperatura_armazem_${idSensor}`).innerHTML = temp + "°C";
    }
    if (document.getElementById(`umidade_armazem_${idSensor}`) != null) {
        document.getElementById(`umidade_armazem_${idSensor}`).innerHTML = umi + "°%";
    }

    // if (document.getElementById(`card_${idAquario}`)) {
    //     card = document.getElementById(`card_${idAquario}`)
    //     card.className = classe_temperatura;
    // }

    

    // var grauDeAviso = '';

    // var limites = {
    //     muito_quente: 23,
    //     quente: 22,
    //     ideal: 20,
    //     frio: 10,
    //     muito_frio: 5
    // };

    // var classe_temperatura = 'cor-alerta';

    // if (temp >= limites.muito_quente) {
    //     classe_temperatura = 'cor-alerta perigo-quente';
    //     grauDeAviso = 'perigo quente'
    //     grauDeAvisoCor = 'cor-alerta perigo-quente'
    //     exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    // }
    // else if (temp < limites.muito_quente && temp >= limites.quente) {
    //     classe_temperatura = 'cor-alerta alerta-quente';
    //     grauDeAviso = 'alerta quente'
    //     grauDeAvisoCor = 'cor-alerta alerta-quente'
    //     exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    // }
    // else if (temp < limites.quente && temp > limites.frio) {
    //     classe_temperatura = 'cor-alerta ideal';
    //     removerAlerta(idAquario);
    // }
    // else if (temp <= limites.frio && temp > limites.muito_frio) {
    //     classe_temperatura = 'cor-alerta alerta-frio';
    //     grauDeAviso = 'alerta frio'
    //     grauDeAvisoCor = 'cor-alerta alerta-frio'
    //     exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    // }
    // else if (temp <= limites.muito_frio) {
    //     classe_temperatura = 'cor-alerta perigo-frio';
    //     grauDeAviso = 'perigo frio'
    //     grauDeAvisoCor = 'cor-alerta perigo-frio'
    //     exibirAlerta(temp, idAquario, grauDeAviso, grauDeAvisoCor)
    // }


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

function transformarEmDiv({ idAquario, temp, grauDeAviso, grauDeAvisoCor }) {

    var descricao = JSON.parse(sessionStorage.AQUARIOS).find(item => item.id == idAquario).descricao;
    return `
    <div class="mensagem-alarme">
        <div class="informacao">
            <div class="${grauDeAvisoCor}">&#12644;</div> 
            <h3>${descricao} está em estado de ${grauDeAviso}!</h3>
            <small>Temperatura capturada: ${temp}°C.</small>   
        </div>
        <div class="alarme-sino"></div>
    </div>
    `;
}


function atualizacaoPeriodica() {
    JSON.parse(sessionStorage.ARMAZENS).forEach(item => {
        obterdados(item.idSensor)
    });
    setTimeout(atualizacaoPeriodica, 5000);
}



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

    AdicionarDadoDeUmidade(umi, moment);
    AdicionarDadoDeTemperatura(temp, moment)
}


function atualizacaoPeriodicaMedia() {
    JSON.parse(sessionStorage.ARMAZENS).forEach(item => {

        obterMediaDados(item.idArmazem)
    });
    setTimeout(atualizacaoPeriodicaMedia, 5000);
}







let medumidade = 0


