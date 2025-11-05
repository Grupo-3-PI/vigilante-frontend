var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT id, nome, email, codigo_empresa FROM Agencia;`;

  return database.executar(instrucaoSql);
}

function buscarPorCodigo(codigo_empresa) {
  var instrucaoSql = `SELECT id FROM Agencia WHERE codigo_empresa = '${codigo_empresa}';`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listar,
  buscarPorCodigo
};