var filtroModel = require("../models/filtrosModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var descricao = req.body.descricaoServer;
    var categoria = req.body.categoriaServer;
    var fk_administrador = Number(req.body.fkAdministradorServer); 

    if (!nome || !descricao || !categoria) {
        return res.status(400).send("Dados inválidos");
    }

    if (!fk_administrador || isNaN(fk_administrador)) {
        return res.status(400).send("Administrador não identificado ou inválido");
    }

    filtroModel.cadastrar(nome, descricao, categoria, fk_administrador)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao cadastrar filtro:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}


function listarTodos(req, res) {
    filtroModel.listarTodos()
        .then(resultado => {
            if (resultado.length > 0) res.json(resultado);
            else res.status(404).send("Nenhum filtro encontrado");
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        });
}

function editar(req, res) {
    var id = req.params.id;
    var nome = req.body.nomeServer;
    var descricao = req.body.descricaoServer;
    var categoria = req.body.categoriaServer;

    if (!nome || !descricao || !categoria) {
        res.status(400).send("Dados inválidos");
    } else {
        filtroModel.editar(id, nome, descricao, categoria)
            .then(resultado => res.json(resultado))
            .catch(erro => {
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function atualizarStatus(req, res) {
    var id = req.params.id;
    var status = req.body.statusServer;

    if (!status) {
        res.status(400).send("Status inválido");
    } else {
        filtroModel.atualizarStatus(id, status)
            .then(resultado => res.json(resultado))
            .catch(erro => {
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrar,
    listarTodos,
    editar,
    atualizarStatus
};
