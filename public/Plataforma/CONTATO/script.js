function voltarHome() {
    window.location.href = '../SITE/index.html';
}

const pergunta_1 = 'Com que frequência os sensores precisam ser calibrados?'
const pergunta_2 = "Os sensores são à prova d'água?"
const pergunta_3 = 'Quais são os requisitos de manutenção para os sensores?'
const pergunta_4 = 'Como eu faço para cadastrar um novo funcionário?'
const pergunta_5 = 'Como cadastrar um novo armazém?'
const pergunta_6 = 'Como eu sei quais são os últimos do mês?'

const resposta_1 = 'Os sensores serão calibrados a cada três meses para evitar mal funcionamento.'
const resposta_2 = "Não, nossos sensores não são a prova d'água."
const resposta_3 = 'É importante garantir que os sensores estejam limpos e livres de empecilhos que possam afetar as medições.'
const resposta_4 = 'Para cadastrar um novo funcionário basta você acessar o seu perfil e clicar no botão “+” e informar os dados do novo funcionário.'
const resposta_5 = 'Para cadastrar um novo armazém, basta você fazer a solicitação clicando em “Solicitar um Novo Armazém” na página de perfil.'
const resposta_6 = 'Basta acessar a aba de histórico e selecionar dentre as opções os registros do mês.'


function perguntar() {
    const num_pergunta = select_pergunta.value

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
    } else if (num_pergunta == '2') {
        p_pergunta.innerHTML = pergunta_2
        p_resposta.innerHTML = resposta_2
    } else if (num_pergunta == '3') {
        p_pergunta.innerHTML = pergunta_3
        p_resposta.innerHTML = resposta_3
    } else if (num_pergunta == '4') {
        p_pergunta.innerHTML = pergunta_4
        p_resposta.innerHTML = resposta_4
    } else if (num_pergunta == '5') {
        p_pergunta.innerHTML = pergunta_5
        p_resposta.innerHTML = resposta_5
    } else {
        p_pergunta.innerHTML = pergunta_6
        p_resposta.innerHTML = resposta_6
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