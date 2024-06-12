var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    console.log("Recebido pedido de cadastro: ", req.body);
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    console.log("Recebido pedido de autenticação: ", req.body);
    usuarioController.autenticar(req, res);
});

router.get("/funcionario/:idEmpresa", function (req, res) {
    console.log("Recebido pedido de lisagem de funcionário: ", req.body);
    usuarioController.mostrarFuncionario(req, res);
});

module.exports = router;
