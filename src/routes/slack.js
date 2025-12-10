var express = require("express");
var router = express.Router();


var slackController = require("../controllers/slackController");

//Função que vai alterar o status tabela Slack
router.put("/alterarStatus", slackController.alterarStatus);

//Função que vai alterar o canal da tabela Slack
router.put("/alterarCanal", slackController.alterarCanal);

//Função que vai alterar as notificações da tabela Slack;
router.put("/alterarNotificacoes", slackController.alterarNotificacoes)



module.exports = router;