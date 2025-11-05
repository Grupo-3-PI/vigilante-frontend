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
    var codigo_empresa = req.body.codigoEmpresaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (codigo_empresa == undefined) {
        res.status(400).send("O código da empresa está undefined!");
    } else {
        agenciaModel.buscarPorCodigo(codigo_empresa)
            .then(resultadoAgencia => {
                if (resultadoAgencia.length > 0) {
                    const fk_agencia = resultadoAgencia[0].id;
                    usuarioModel.cadastrar(nome, email, senha, fk_agencia)
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

module.exports = {
    autenticar,
    cadastrar
}