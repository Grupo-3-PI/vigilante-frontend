var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatoriosController");

router.post("/cadastrar", relatorioController.cadastrar);
router.get("/listar", relatorioController.listarTodos);
router.put("/editar/:id", relatorioController.editar);
router.put("/status/:id", relatorioController.atualizarStatus);
router.get("/listar/:idAgencia", relatorioController.listarPorAgencia);

module.exports = router;
