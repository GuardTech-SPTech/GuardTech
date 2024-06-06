(function(){
  emailjs.init('Miihlr9wEIdLBcJ3w')  
})();

console.log(sessionStorage.NOME_COMPLETO_USUARIO)


function SolicitarArmazem(){
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
        message: document.getElementById('message').value
    }


    emailjs.send('service_vlpzbup', 'template_y3u3wku', templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Email enviado com sucesso!');
    }, function(error) {
        console.log('FAILED...', error);
        alert('Ocorreu um erro ao enviar o email.');
    });
}