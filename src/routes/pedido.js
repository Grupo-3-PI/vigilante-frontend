var express = require("express");
var router = express.Router();

var pedidoController = require("../controllers/pedidoController");

router.post("/cadastrar", function (req, res) {
    pedidoController.cadastrar(req, res);
})

router.get("/listar", function (req, res) {
    pedidoController.listar(req, res);
});

router.get("/listarPorAgencia/:idAgencia", function (req, res) {
    pedidoController.listarPorAgencia(req, res);
});

router.put("/aceitar/:id", function (req, res) {
    pedidoController.aceitar(req, res);
})

router.put("/recusar/:id", function (req, res) {
    pedidoController.recusar(req, res);
})

module.exports = router;