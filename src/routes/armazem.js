var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/armazemController");

router.get("/listar/:empresaId", function (req, res) {
  aquarioController.buscarArmazemPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  aquarioController.cadastrar(req, res);
})

router.get("/toPerfil/:empresaId", function (req, res) {
  aquarioController.buscarArmazemPorEmpresatoPerfil(req, res)
})

module.exports = router;