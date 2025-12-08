var database = require("../database/config");

function cadastrar(nome, descricao, categoria, fk_administrador) {
    var instrucaoSql = `
        INSERT INTO Filtros (nome, descricao, categoria, fk_administrador, data_criacao, status)
        VALUES ('${nome}', '${descricao}', '${categoria}', ${fk_administrador}, NOW(), 'Ativo');
    `;
    return database.executar(instrucaoSql);
}

function listarTodos() {
    var instrucaoSql = `
        SELECT id, nome, descricao, categoria, data_criacao, fk_administrador, status
        FROM Filtros;
    `;
    return database.executar(instrucaoSql);
}

function editar(id, nome, descricao, categoria) {
    var instrucaoSql = `
        UPDATE Filtros 
        SET nome = '${nome}', descricao = '${descricao}', categoria = '${categoria}'
        WHERE id = ${id};
    `;
    return database.executar(instrucaoSql);
}

function atualizarStatus(id, status) {
    var instrucaoSql = `
        UPDATE Filtros 
        SET status = '${status}'
        WHERE id = ${id};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    listarTodos,
    editar,
    atualizarStatus
};
