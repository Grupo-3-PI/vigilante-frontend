var database = require("../database/config")

function cadastrar(status, fk_usuario, fk_administrador) {
    var instrucaoSql = `
            INSERT INTO Pedidos(status, fk_usuario, fk_administrador) VALUES('${status}', ${fk_usuario}, ${fk_administrador});
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    console.log("Listando todos os pedidos...");
    var instrucaoSql = `
        SELECT id, data_criacao, status FROM Pedidos;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function aceitar(id) {
    var instrucaoSql = `
        UPDATE Pedidos SET status = "Aprovado" WHERE id = ${id};
    `
}

function recusar(id) {
    var instrucaoSql = `
        UPDATE Pedidos SET status = "Recusado" WHERE id = ${id};
    `
}

module.exports = {
    cadastrar,
    listar,
    aceitar,
    recusar
};