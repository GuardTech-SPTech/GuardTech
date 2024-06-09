var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idSensor", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})


router.get("/media/:idArmazem", function (req, res){
    medidaController.buscarMediaMedidas(req, res);
})

router.post("/armazem", function (req, res) {
    console.log("Recebido pedido de autenticação: ", req.body);
    medidaController.informacoesArmazem(req, res);
});

module.exports = router;