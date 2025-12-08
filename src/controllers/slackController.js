var slackModel = require("../models/slackModel");


function alterarCanal(req, res) {
    var fkUsuario = req.body.fkUsuario;
    var canal = req.body.canal

    slackModel.alterarCanal(fkUsuario, canal)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ao editar o canal do Slack:", erro);
            res.status(500).json(erro);
        });
}

function alterarStatus(req, res) {
    var fkUsuario = req.body.fkUsuario;
    var status = req.body.status;

    slackModel.alterarStatus(fkUsuario, status)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ao alterar o status da notificação no Slack:", erro);
            res.status(500).json(erro);
        });
}

function alterarNotificacoes(req, res) {
    var fkUsuario = req.body.fkUsuario;
    var info = req.body.info;
    var warn = req.body.warn;
    var error = req.body.error;

    slackModel.alterarNotificacoes(fkUsuario, info, warn, error)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ao alterar notificaçoes recebidas:", erro);
            res.status(500).json(erro);
        });
}



module.exports = {
 
  alterarCanal,
  alterarStatus,
  alterarNotificacoes
};
