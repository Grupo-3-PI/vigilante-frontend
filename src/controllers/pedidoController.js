var pedidoModel = require("../models/pedidoModel");

function cadastrar(req, res) {
    var descricao = req.body.descricaoServer;
    var status = "pendente";
    var fk_usuario = req.body.fk_usuarioServer;
    var fk_administrador = req.body.fk_administradorServer;

    if (!descricao || !fk_usuario) {
        res.status(400).send("Dados inválidos");
    } else {
        pedidoModel.cadastrar(descricao, status, fk_usuario, fk_administrador)
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

module.exports = {
    cadastrar,
    listar
};