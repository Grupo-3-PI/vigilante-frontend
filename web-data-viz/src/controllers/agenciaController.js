var agenciaModel = require("../models/agenciaModel");

function listar(req, res) {
  agenciaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
  listar
};