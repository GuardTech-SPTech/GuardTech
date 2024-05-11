var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    console.log("Recebido pedido de cadastro: ", req.body);
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    console.log("Recebido pedido de autenticação: ", req.body);
    usuarioController.autenticar(req, res);
});

module.exports = router;