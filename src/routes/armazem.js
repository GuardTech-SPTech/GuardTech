var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/armazemController");

router.get("/:empresaId", function (req, res) {
  aquarioController.buscarArmazemPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  aquarioController.cadastrar(req, res);
})

module.exports = router;