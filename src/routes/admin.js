var express = require("express");
var router = express.Router();

var adminController = require("../controllers/adminController");

//Recebendo os dados do html e direcionando para a função cadastrar de adminController.js
router.post("/cadastrar", function (req, res) {
    console.log("Recebido pedido de cadastro: ", req.body);
    adminController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    console.log("Recebido pedido de autenticação: ", req.body);
    adminController.autenticar(req, res);
});

module.exports = router;