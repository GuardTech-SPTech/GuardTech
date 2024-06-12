

(function () {
    emailjs.init('Miihlr9wEIdLBcJ3w')
})();

console.log(sessionStorage.NOME_COMPLETO_USUARIO)


function SolicitarArmazem() {

    let idEmpresa = sessionStorage.getItem('ID_EMPRESA')
    let idUsuario = sessionStorage.getItem('ID_USUARIO')

    let capacidadeVar = input_capacidade.value;
    let descricaoVar = input_descricao.value;
    let cepVar = input_cep.value;
    let numeroVar = input_num.value;
    let bairroVar = input_bairro.value;
    let cidadeVar = input_cidade.value;
    let complementoVar = input_complemento.value;
    let tipoVar = select_tipo_armazem.value;
    let obsVar = input_obs.value;


    var templateParams = {
        from_company: sessionStorage.NOME_EMPRESA,
        from_name: sessionStorage.NOME_COMPLETO_USUARIO,
        from_email: sessionStorage.EMAIL_USUARIO,
        to_name: 'GuardTech',
        to_email: '',
        from_size: document.getElementById('input_capacidade').value,
        from_type: document.getElementById('select_tipo_armazem').value,
        from_desc: document.getElementById('input_descricao').value,
        from_cep: document.getElementById('input_cep').value,
        from_bairro: document.getElementById('input_bairro').value,
        from_cidade: document.getElementById('input_cidade').value,
        from_comp: document.getElementById('input_complemento').value,
        message: document.getElementById('input_obs').value
    }


    emailjs.send('service_vlpzbup', 'template_y3u3wku', templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Email enviado com sucesso!');
        }, function (error) {
            console.log('FAILED...', error);
            alert('Ocorreu um erro ao enviar o email.');
        });



    fetch("../../solicitar/cadastrarEmail", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            capacidadeServer: capacidadeVar,
            descricaoServer: descricaoVar,
            cepServer: cepVar,
            numeroServer: numeroVar,
            bairroServer: bairroVar,
            cidadeServer: cidadeVar,
            complementoServer: complementoVar,
            tipoServer: tipoVar,
            obsServer: obsVar,
            idEmpresaServer: idEmpresa,
            idFuncionarioServer: idUsuario  
            
        })

    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Email cadastrado com sucesso!")

            window.location.href = "../SITE/perfil.html"
        } else {
            throw "Houve um erro ao tentar cadastrar o E-mail";
        }
    })
        .catch(function (resposta) {
            console.log(`TEM UM ERRO DO FETCH: ${resposta}`);
        });

    return false;
}