var express = require("express");
var router = express.Router();

var solicitarController = require("../controllers/solicitarController");

//Recebendo os dados do html e direcionando para a função cadastrar de solicitarController.js
router.post("/cadastrarEmail", function (req, res) {
    console.log("Recebido pedido de cadastro: ", req.body);
    solicitarController.cadastrarEmail(req, res);
})


module.exports = router;