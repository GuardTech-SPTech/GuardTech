const sensores = JSON.parse(sessionStorage.SENSORES)
const selectSensor = document.getElementById('select_sensores')

let sensorSelecionado = sessionStorage.getItem("SENSOR_SELECIONADO")
let myChart;

function updateSensorSelecionado(sensor){
    sessionStorage.setItem('SENSOR_SELECIONADO', sensor)

    sensorSelecionado = sessionStorage.getItem("SENSOR_SELECIONADO")

    updateChart(select_periodo.value)

    

}


sensores.forEach((sensor, index) =>{
    selectSensor.innerHTML += `<option value = ${sensor.idSensor}> Sensor ${index + 1}`
})
 

document.addEventListener("DOMContentLoaded", function () {
     sensorSelecionado = sessionStorage.getItem("SENSOR_SELECIONADO")

    

    console.log(sensorSelecionado)

    const ctx = document.getElementById('myChart').getContext('2d');
    window.updateChart = function (option) {

        console.log("A FUNÇÃO FOI CHAMADA")
        if (myChart) {
            myChart.destroy();
        }

        if (option === 'meses') {
            fetch(`../../medidas/mes/${sensorSelecionado}`, {
                method: "GET"
            }).then(resposta => {
                if (resposta.ok) {
                    const dadosTemp = [0,0,0,0];
                    const dadosUmi = [0,0,0,0];

                    console.log(resposta)

                    resposta.json().then(resposta => {
                        resposta.forEach(tupla => {
                            dadosTemp[tupla.semana_do_mes - 1] = tupla.media_temperatura;
                            dadosUmi[tupla.semana_do_mes - 1] = tupla.media_umidade;
                        });

                        myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                                datasets: [{
                                    label: 'Temperatura',
                                    data: dadosTemp,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1
                                }, {
                                    label: 'Umidade',
                                    data: dadosUmi,
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        });
                    });
                }
            });
        } else if (option === 'ano') {
            fetch(`../../medidas/ano/${sensorSelecionado}`, {
                method: "GET"
            }).then(resposta => {
                if (resposta.ok) {
                    console.log(resposta)
                    let dadosTemp = [0,0,0,0,0,0,0,0,0,0,0,0]
                    let dadosUmi = [0,0,0,0,0,0,0,0,0,0,0,0]
                    console.log(sensorSelecionado)

                    resposta.json().then(resposta => {
                        resposta.forEach(tupla => {
                            dadosTemp[tupla.mes] = tupla.media_temperatura;
                            dadosUmi[tupla.mes] = tupla.media_umidade;
                        });

                        myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                                datasets: [{
                                    label: 'Temperatura',
                                    data: dadosTemp,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1
                                }, {
                                    label: 'Umidade',
                                    data: dadosUmi,
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        });
                    });
                }
            });
        } else if (option === 'semana') {
            fetch(`../../medidas/semana/${sensorSelecionado}`, {
                method: "GET"
            }).then(resposta => {
                if (resposta.ok) {
                    console.log(resposta)
                    let dadosTemp = [0,0,0,0,0,0,0]
                    let dadosUmi = [0,0,0,0,0,0,0]
                    console.log(sensorSelecionado)

                    resposta.json().then(resposta => {
                        resposta.forEach(tupla => {
                            console.log(tupla)
                            dadosTemp[tupla.dia_da_semana_numero] = tupla.media_temperatura;
                            dadosUmi[tupla.dia_da_semana_numero] = tupla.media_umidade;
                        });

                        myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sáb'],
                                datasets: [{
                                    label: 'Temperatura',
                                    data: dadosTemp,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1
                                }, {
                                    label: 'Umidade',
                                    data: dadosUmi,
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        });
                    });
                }
            })
        } else if (option === 'dia') {
            fetch(`../../medidas/dia/${sensorSelecionado}`, {
                method: "GET"
            }).then(resposta => {
                if (resposta.ok) {

                    const dadosTemp = [0,0,0,0,0,0,0,0];
                    const dadosUmi = [0,0,0,0,0,0,0,0];

                    resposta.json().then(resposta => {
                        resposta.forEach(tupla => {
                            console.log(resposta)
                            dadosTemp[(tupla.intervalo / 3)] = tupla.media_temperatura;
                            dadosUmi[(tupla.intervalo / 3)] = tupla.media_umidade;
                        });

                        myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
                                datasets: [{
                                    label: 'Temperatura',
                                    data: dadosTemp,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1
                                }, {
                                    label: 'Umidade',
                                    data: dadosUmi,
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        });
                    });
                }
            }).catch(   
            );;
        }
    };
});

