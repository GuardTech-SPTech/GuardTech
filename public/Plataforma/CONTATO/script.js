function voltarHome() {
    window.location.href = '../SITE/index.html';
}

function perguntar() {
    const num_pergunta = select_pergunta.value

    p_pergunta.innerHTML = ''
    p_resposta.innerHTML = ''

    let pergunta_1 = 'Como funciona a solução?'
    let resposta_1 = 'O projeto tem como objetivo capturar e monitorar dados de temperatura e umidade, através de sensores que serão instalados em armazéns de grãos de milho.'

    // Animação
    let usuario = document.getElementById('pergunta_usuario') 
    let empresa = document.getElementById('resposta_empresa') 
    usuario.classList.remove('x');
    usuario.classList.remove('x2');
    usuario.classList.add('box-r');
    empresa.classList.remove('x');
    empresa.classList.remove('x2');
    empresa.classList.add('box-l');
    

    if (num_pergunta == '1') {
        p_pergunta.innerHTML = pergunta_1
        p_resposta.innerHTML = resposta_1
    }
}

function TrocarClasse() {
    // Animação
    let usuario = document.getElementById('pergunta_usuario') 
    let empresa = document.getElementById('resposta_empresa')
    usuario.classList.remove('box-r');
    usuario.classList.add('x');
    usuario.classList.remove('box-l');
    empresa.classList.add('x');
}