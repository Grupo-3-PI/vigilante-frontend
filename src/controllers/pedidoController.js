var pedidoModel = require("../models/pedidoModel");

function cadastrar(req, res) {
    var descricao = req.body.descricaoServer;
    var fk_usuario = req.body.fk_usuarioServer;

    var status = "pendente";
    var fk_administrador = null; 

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
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarPorAgencia(req, res) {
    var idAgencia = req.params.idAgencia;

    pedidoModel.listarPorAgencia(idAgencia)
        .then(resultado => {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    cadastrar,
    listar,
    listarPorAgencia
};