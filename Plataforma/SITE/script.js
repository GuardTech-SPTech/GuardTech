function sendMail() {
    console.log("sipa enviou")
    let parms = {
        NOME : document.getElementById("input_nome").value,
        EMAIL : document.getElementById("input_email").value,
        MENSAGEM : document.getElementById("input_mensagem").value,
    }

    emailjs.send("service_zt8m1dm","template_00fvsvo",parms).then(alert("Email Enviado!"))
}