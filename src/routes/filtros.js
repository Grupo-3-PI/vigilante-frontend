var express = require("express");
var router = express.Router();

var filtroController = require("../controllers/filtrosController");

router.post("/cadastrar", function (req, res) {
    filtroController.cadastrar(req, res);
});

router.get("/listarTodos", function (req, res) {
    filtroController.listarTodos(req, res);
});

router.put("/editar/:id", function (req, res) {
    filtroController.editar(req, res);
});

router.put("/atualizarStatus/:id", function (req, res) {
    filtroController.atualizarStatus(req, res);
});


module.exports = router;
