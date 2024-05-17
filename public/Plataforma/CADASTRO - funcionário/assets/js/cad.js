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