var relatorioModel = require("../models/relatoriosModel");

function cadastrar(req, res) {
    var titulo = req.body.titulo;
    var fkUsuario = req.body.fkUsuario;
    var fkOcorrencias = req.body.fkOcorrencias;
    var status = req.body.status;

    relatorioModel.cadastrar(titulo, fkUsuario, fkOcorrencias, status)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ao cadastrar relatório:", erro);
            res.status(500).json(erro);
        });
}

function listarTodos(req, res) {
    relatorioModel.listarTodos()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ao listar relatórios:", erro);
            res.status(500).json(erro);
        });
}

function editar(req, res) {
    var id = req.params.id;
    var titulo_relatorio = req.body.titulo_relatorio;

    relatorioModel.editar(id, titulo_relatorio)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ao editar relatório:", erro);
            res.status(500).json(erro);
        });
}


function atualizarStatus(req, res) {
    var id = req.params.id;
    var status = req.body.status;

    relatorioModel.atualizarStatus(id, status)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ao atualizar status:", erro);
            res.status(500).json(erro);
        });
}

function listarPorAgencia(req, res) {
    var idAgencia = req.params.idAgencia;

    relatorioModel.listarPorAgencia(idAgencia)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ao listar relatórios por agência:", erro);
            res.status(500).json(erro);
        });
}

module.exports = {
    cadastrar,
    listarTodos,
    editar,
    atualizarStatus,
    listarPorAgencia
};
