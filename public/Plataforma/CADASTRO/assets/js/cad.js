function cad() {
  const nomeVar = input_empresa.value
  const cepVar = input_cep.value
  const numeroVar = input_num.value
  const logVar = input_logradouro.value;
  const bairroVar = input_bairro.value;
  const cidadeVar = input_cidade.value;
  const cnpjVar = input_cnpj.value;
  const estadoVar = input_estado.value
  const complementoVar = input_complemento.value


  fetch("../../empresas/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      cnpjServer: cnpjVar
    })

  }).then(function (resposta) {
    console.log("resposta: ", resposta);

    resposta.json()
      .then(function (json) {
        console.log(json.idEmpresa)
        sessionStorage.setItem('idEmpresaSession', json.idEmpresa);



        fetch("../../enderecos/cadastrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idEmpresaServer: json.idEmpresa,
            cepServer: cepVar,
            numeroServer: numeroVar,
            logradouroServer: logVar,
            bairroServer: bairroVar,
            cidadeServer: cidadeVar,
            estadoServer: estadoVar,
            complementoServer: complementoVar
          })

        }).then(function (resposta) {
          console.log("Resposta endereço: ", resposta)
        }).catch(function (erro) {
          console.log(erro)
        })
      })
      .catch(function (err) {
        console.log(err)
      })

    if (resposta.ok) {
      alert("Cadastro realizado com sucesso!")
      sessionStorage.setItem('empresaSession', nomeVar)
      window.location.href = "../CADASTRO/cadastroAdministrador.html"
    } else {
      throw "Houve um erro ao tentar realizar o cadastro!";
    }
  })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;

}