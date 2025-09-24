var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT idAgencia, nome, cnpj, codigoAtivacao FROM agencia;`;

  return database.executar(instrucaoSql);
}

module.exports = {listar};