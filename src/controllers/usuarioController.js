var usuarioModel = require("../models/usuarioModel");
var agenciaModel = require("../models/agenciaModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cargo_agencia = req.body.cargo_agenciaServer;
    var codigo_empresa = req.body.codigoEmpresaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if(cargo_agencia == undefined) {
        res.status(400).send("O cargo da empresa está undefined");
    } else if (codigo_empresa == undefined) {
        res.status(400).send("O código da empresa está undefined!");
    } else {
        agenciaModel.buscarPorCodigo(codigo_empresa)
            .then(resultadoAgencia => {
                if (resultadoAgencia.length > 0) {
                    const fk_agencia = resultadoAgencia[0].id;
                    usuarioModel.cadastrar(nome, email, senha, cargo_agencia, fk_agencia)
                        .then(resultadoCadastro => {
                            res.json(resultadoCadastro);
                        })
                        .catch(erro => {
                            console.log(erro);
                            res.status(500).json(erro.sqlMessage);
                        });
                } else {
                    res.status(404).send("Código de empresa não encontrado!");
                }
            })
            .catch(erro => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listarTodosAgencia(req, res) {
    var fk_agencia = req.body.fkAgenciaServer;

    if (fk_agencia == undefined) {
        res.status(400).send("Código de agência inválido");
    } else {
        usuarioModel.listarTodosAgencia(fk_agencia)
            .then(
                function (resultadoListarTodosAgencia) {
                    console.log(`\nResultados encontrados: ${resultadoListarTodosAgencia.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoListarTodosAgencia)}`); // transforma JSON em String

                    if (resultadoListarTodosAgencia.length >= 1) {
                        console.log(resultadoListarTodosAgencia);
                        res.json(resultadoListarTodosAgencia);
                    } else if (resultadoListarTodosAgencia.length == 0) {
                        res.status(403).send("Código de agência inválido!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao listar usuários! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function editarUsuarios(req, res) {
    var id = req.params.id;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var status = req.body.statusServer;
    var cargo_agencia = req.body.cargo_agenciaServer;

    if (nome == undefined) {
        res.status(400).send(`O nome do usuário de id ${id} está undefined!`);
    } else if (email == undefined) {
        res.status(400).send(`O email usuário de id ${id} está undefined!`);
    } else if(cargo_agencia == undefined) {
        res.status(400).send(`O cargo do usuário de id ${id} está undefined!`);
    } else if(status == undefined) {
        res.status(400).send(`O status do usuário de id ${id} está undefined!`);
    } else {
        usuarioModel.editarUsuarios(id, nome, email, status, cargo_agencia)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao editar: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function atualizarStatusUsuario(req, res) {
    var id = req.params.id;
    var status = req.body.statusServer;

    if(status == undefined) {
        res.status(400).send(`O status do usuário de id ${id} está undefined!`);
    } else {
        usuarioModel.atualizarStatusUsuario(id, status)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao editar: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    listarTodosAgencia,
    editarUsuarios,
    atualizarStatusUsuario
}