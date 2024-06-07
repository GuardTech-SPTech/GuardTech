function sendMail() {
    console.log("EMAIL ENVIADO")
    let parms = {
        NOME : document.getElementById("input_nome").value,
        EMAIL : document.getElementById("input_email").value,
        MENSAGEM : document.getElementById("input_mensagem").value,
    }

    emailjs.send("service_zt8m1dm","template_00fvsvo",parms).then(alert("Email Enviado!"))

    cadastrarLead(parms.NOME, parms.EMAIL, parms.MENSAGEM)

    }

function cadastrarLead(NOME, EMAIL, MENSAGEM) {
    console.log(NOME, EMAIL, MENSAGEM)
    fetch("../../lead/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: NOME,
            emailServer: EMAIL,
            mensagemServer: MENSAGEM
        })

    }).then(function (resposta) {
        console.log("resposta: ", resposta);
    }).catch(function (resposta) {
            console.log(`ERRO NO FETCH: ${resposta}`);
        });

    return false;
}

