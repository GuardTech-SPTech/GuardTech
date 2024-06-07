var express = require("express");
var router = express.Router();

var leadController = require("../controllers/leadController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.post("/cadastrar",function (req, res){
    // função a ser chamada quando acessar /carros/cadastrar
    leadController.cadastrarLead(req,res)
}) 

module.exports = router;