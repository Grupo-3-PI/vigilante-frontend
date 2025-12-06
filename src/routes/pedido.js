var express = require("express");
var router = express.Router();

var pedidoController = require("../controllers/pedidoController");

router.post("/cadastrar", function (req, res) {
    pedidoController.cadastrar(req, res);
})

router.post("/listar", function (req, res) {
    pedidoController.cadastrar(req, res);
})

router.post("/aceitar/:id", function (req, res) {
    pedidoController.aceitar(req, res);
})

router.post("/recusar/:id", function (req, res) {
    pedidoController.recusar(req, res);
})

module.exports = router;