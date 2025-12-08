var adminModel = require("../models/adminModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        adminModel.autenticar(email, senha)
            .then(resultado => {

                if (resultado.length == 1) {
                    res.json(resultado[0]); 
                } else if (resultado.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um administrador com o mesmo login!");
                }

            })
            .catch(erro => {
                console.log("Erro no login do administrador:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar
}
