

function login() {
    
    const emailVar = input_email.value;
    const senhaVar = input_senha.value;
    const nomeVar = input_empresa.value;

    console.log(nomeVar, emailVar, senhaVar)

    if (emailVar == "" || senhaVar == "" || nomeVar == "") {
        alert("Mensagem de erro para todos os campos em branco");
        return false;
    }
    console.log("FORM NOME:", nomeVar)
    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("../../usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
            
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log('esta ok')
            console.log("RESPOSTA",  resposta);

            resposta.json().then(json => {
                console.log('json da resposta', json);
                console.log(json.username, json.nomeCompleto)
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.username;
                sessionStorage.NOME_COMPLETO_USUARIO = json.nomeCompleto;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.NOME_EMPRESA = json.nomeEmpresa;
                sessionStorage.ID_EMPRESA = json.empresaId;
                sessionStorage.ARMAZENS = JSON.stringify(json.armazens);
                sessionStorage.TELEFONE = json.telefone;
                
                window.location.href = '../Monitoramento1/index.html'
            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}
