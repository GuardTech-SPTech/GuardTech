var usuarioModel = require("../models/usuarioModel");
var armazemModel = require("../models/armazemModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nome = req.body.nomeServer;
    

    if (email == undefined) {
        res.status(400).send("Seu email está indefinida!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(nome, email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        armazemModel.buscarArmazemPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoArmazem) => {
                                if (resultadoArmazem.length > 0) {
                                    res.json({
                                        idUsuario: resultadoAutenticar[0].idFuncionario,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].username,
                                        empresaId: resultadoAutenticar[0].empresaId,
                                        nomeCompleto: resultadoAutenticar[0].nomeCompleto,
                                        nomeEmpresa: resultadoAutenticar[0].empresa,
                                        armazens: resultadoArmazem
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar(req, res) {
    console.log(req.body)
   
    // const { nomeServer, usernameServer, emailServer, cpfServer, senhaServer, tipoFuncionarioServer} = req.body;
    const nomeServer = req.body.nomeServer;
    const usernameServer = req.body.usernameServer;
    const emailServer = req.body.emailServer;
    const cpfServer = req.body.cpfServer;
    const senhaServer = req.body.senhaServer;
    const tipoFuncionarioServer = req.body.tipoFuncionarioServer;
    const idEmpresaServer  = req.body.idEmpresaServer;

    usuarioModel.cadastrarFuncionario(nomeServer, idEmpresaServer, usernameServer, emailServer, cpfServer, senhaServer, tipoFuncionarioServer)
        .then(resultado => res.status(201).json(resultado))
        .catch(erro => {
            console.error('Erro ao cadastrar funcionário:', erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    autenticar,
    cadastrar
};
