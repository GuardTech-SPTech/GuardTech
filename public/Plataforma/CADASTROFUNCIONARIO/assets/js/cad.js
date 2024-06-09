function cad() {
    const nomeVar = input_empresa.value
    const cepVar = input_cep.value
    const numeroVar = input_num.value
    const logVar = input_logradouro.value;
    const bairroVar = input_bairro.value;
    const cidadeVar = input_cidade.value;
    const cnpjVar = input_cnpj.value

    fetch("../../empresas/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            cepServer: cepVar,
            numeroServer: numeroVar,
            logradouroServer: logVar,
            bairroServer: bairroVar,
            cidadeServer: cidadeVar,
            cnpjServer: cnpjVar
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

function cadastrarFuncionario() {
    const nome = document.querySelector('#input_nome').value;
    const username = document.querySelector('#input_username').value;
    const email = document.querySelector('#input_email').value;
    const cpf = document.querySelector('#input_cpf').value;
    const senha = document.querySelector('#input_senha').value;
    const tipoFuncionario = document.querySelector('#select_tipo_funcionario').value;

    fetch("/usuarios/cadastrar", {  // Certifique-se de que esta rota está correta conforme a configuração do seu servidor
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            usernameServer: username,
            emailServer: email,
            cpfServer: cpf,
            senhaServer: senha,
            tipoFuncionarioServer: tipoFuncionario
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Cadastro de funcionário realizado com sucesso!");
            window.location.href = "../SITE/index.html";
        } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}
