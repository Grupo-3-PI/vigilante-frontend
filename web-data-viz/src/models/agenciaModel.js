var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT idAgencia, nome, email, codigoEmpresa FROM Agencia;`;

  return database.executar(instrucaoSql);
}

function buscarPorCodigo(codigoEmpresa) {
  var instrucaoSql = `SELECT idAgencia FROM Agencia WHERE codigoEmpresa = '${codigoEmpresa}';`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listar,
  buscarPorCodigo
};