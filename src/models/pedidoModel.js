var database = require("../database/config")

function cadastrar(descricao, status, fk_usuario, fk_administrador) {
    var instrucaoSql = `
            INSERT INTO Pedidos(descricao, status, fk_usuario, fk_administrador) VALUES('${descricao}', '${status}', ${fk_usuario}, ${fk_administrador});
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

module.exports = {
    cadastrar,
    listar
};