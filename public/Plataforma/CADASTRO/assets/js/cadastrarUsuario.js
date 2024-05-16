

const nomeEmpresa = sessionStorage.getItem('empresaSession');
const inputEmpresa = document.querySelector('#input_empresa');
inputEmpresa.value = nomeEmpresa 

function cadastrarUsuario() {
    // const nomeVar = input_empresa.value
    // const cepVar = input_cep.value
    // const numeroVar = input_num.value
    // const logVar = input_logradouro.value;
    // const bairroVar = input_bairro.value;
    // const cidadeVar = input_cidade.value;
    // const cnpjVar = input_cnpj.value



    const confirmarSenha = input_confirmar_senha.value
    const usuarioVar = input_usuario.value
    const emailVar = input_email.value
    const nomeCompletoVar = input_nome_completo.value
    const senhaVar = input_senha.value
    const cpfVar = input_cpf.value
    // const idEmpresaVar = idEmpresa
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