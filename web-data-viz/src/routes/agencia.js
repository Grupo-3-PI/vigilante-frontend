var express = require("express");
var router = express.Router();

var agenciaController = require("../controllers/agenciaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.get("/listar", function (req, res) {
  agenciaController.listar(req, res);
});

module.exports = router;