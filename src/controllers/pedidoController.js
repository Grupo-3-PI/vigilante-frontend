var pedidoModel = require("../models/pedidoModel");

function cadastrar(req, res) {
    var status = "Pendente";
    var fk_usuario = req.body.fk_usuarioServer;
    var fk_administrador = req.body.fk_administradorServer;

    if (!fk_usuario) {
        res.status(400).send("Dados inválidos");
    } else {
        pedidoModel.cadastrar(status, fk_usuario, fk_administrador)
            .then(resultado => res.json(resultado))
            .catch(erro => {
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listar(req, res) {
    pedidoModel.listar()
        .then((resultado) => {
            res.status(200).json(resultado);
        });
}

function aceitar(req, res) {
    var id = req.params.id;

    if (!id) {
        res.status(400).send("Dados inválidos");
    } else {
        pedidoModel.aceitar(id)
            .then(resultado => res.json(resultado))
            .catch(erro => {
                res.status(500).json(erro.sqlMessage);
            });
    }

}

function recusar(req, res) {
    var id = req.params.id;

    if (!id) {
        res.status(400).send("Dados inválidos");
    } else {
        pedidoModel.recusar(id)
            .then(resultado => res.json(resultado))
            .catch(erro => {
                res.status(500).json(erro.sqlMessage);
            });
    }

}

module.exports = {
    cadastrar,
    listar,
    aceitar,
    recusar
};