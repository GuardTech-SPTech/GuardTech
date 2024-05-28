
const idEmpresa = sessionStorage.getItem('idEmpresaSession');
const nomeEmpresa = sessionStorage.getItem('empresaSession');
const inputEmpresa = document.querySelector('#input_empresa');
inputEmpresa.value = nomeEmpresa


function showConfirm(){
    const senha = input_senha.value;
    const confirm = input_confirmar_senha.value;

    if(senha != confirm){
        alert_confirm.style.display = 'block'
        alert_confirm.innerHTML = 'As senhas são diferentes!'
    }else{
        alert_confirm.style.display = 'none'
    }
}

function cadastrarUsuario() {



    const confirmarSenha = input_confirmar_senha.value
    const usuarioVar = input_usuario.value
    const emailVar = input_email.value
    const nomeCompletoVar = input_nome_completo.value
    const senhaVar = input_senha.value
    const cpfVar = input_cpf.value
    const idEmpresaVar = idEmpresa

    //CRIANDO VARIAVEIS BOOLEANAS PARA VALIDAÇÃO
    let temMaiscula = false;
    let temMinuscula = false;
    let temNum = false;
    let temEspecial = false;
    let senhaValida = false;

    //CRIANDO ARRAY PARA VALORES ESPECIAIS
    let especiais = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '[', ']', '{', '}', '|', ';', ':', ',', '.', '<', '>', '?'];

    //LIMPANDO CAMPO DE ALERT DA SENHA
    alert_senha.innerHTML = '';

    //FOR PARA VALIDAÇÃO
    for (let posicaoChar = 0; posicaoChar < senhaVar.length; posicaoChar++) {
        let letra = senhaVar[posicaoChar];

        if (letra >= 'A' && letra <= 'Z') {
            temMaiscula = true;
        }

        if (letra >= 'a' && letra <= 'z') {
            temMinuscula = true;
        }

        if (letra >= '0' && letra <= '9') {
            temNum = true;
        }

        if (especiais.indexOf(letra) !== -1) {
            temEspecial = true;
        }
    }

    if (!temMaiscula) {
        alert_senha.style.display = 'block';
        alert_senha.innerHTML = 'A senha deve conter pelo menos uma letra maiscula';
    }

    if (!temMinuscula) {
        alert_senha.style.display = 'block';
        alert_senha.innerHTML = 'A senha deve conter pelo menos uma letra minuscula';
    }

    if (!temNum) {
        alert_senha.style.display = 'block';
        alert_senha.innerHTML = 'A senha deve conter pelo menos um numero';
    }

    if (!temEspecial) {
        alert_senha.style.display = 'block';
        alert_senha.innerHTML = 'A senha deve conter pelo menos 1 caractere especial';
    }

    if (temMaiscula && temMinuscula && temNum && temEspecial && (senhaVar == confirmarSenha)) {
        alert_senha.innerHTML = '';
        senhaValida = true
    }

    if (senhaValida) {

        fetch("../../admin/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuarioServer: usuarioVar,
                emailServer: emailVar,
                nomeCompletoServer: nomeCompletoVar,
                senhaServer: senhaVar,
                cpfServer: cpfVar,
                idEmpresaServer: idEmpresaVar
            })
    
        }).then(function (resposta) {
            console.log("resposta: ", resposta);
    
            if (resposta.ok) {
                alert("Cadastro realizado com sucesso!")
    
                window.location.href = "../SITE/index.html"
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    
        return false;
    }

}