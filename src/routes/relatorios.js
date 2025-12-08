var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatoriosController");

router.post("/cadastrar", relatorioController.cadastrar);
router.get("/listar", relatorioController.listarTodos);
router.get("/pegarDadosConsulta/:id", relatorioController.pegarDadosConsulta);
router.put("/editar/:id", relatorioController.editar);
router.put("/status/:id", relatorioController.atualizarStatus);

module.exports = router;
