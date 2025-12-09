var database = require("../database/config");

function cadastrar(titulo_relatorio, fk_Usuario, fk_Ocorrencias, status) {
    var instrucaoSql = `
        INSERT INTO Relatorio (titulo_relatorio, fk_Usuario, fk_Ocorrencias, status, dt_geracao)
        VALUES ('${titulo_relatorio}', ${fk_Usuario}, ${fk_Ocorrencias}, '${status}', NOW());
    `;
    return database.executar(instrucaoSql);
}


function listarTodos() {
    var instrucaoSql = `
        SELECT 
            r.id,
            r.titulo_relatorio AS nome,
            u.nome AS solicitante,
            r.status,
            a.nome AS agencia,
            r.dt_geracao
        FROM Relatorio r
        JOIN Usuario u ON r.fk_Usuario = u.id
        JOIN Agencia a ON u.fk_agencia = a.id;
    `;
    return database.executar(instrucaoSql);
}

function editar(id, titulo_relatorio) {
    var instrucaoSql = `
        UPDATE Relatorio
        SET titulo_relatorio = '${titulo_relatorio}'
        WHERE id = ${id};
    `;
    return database.executar(instrucaoSql);
}


function atualizarStatus(id, status) {
    var instrucaoSql = `
        UPDATE Relatorio
        SET status = '${status}'
        WHERE id = ${id};
    `;
    return database.executar(instrucaoSql);
}

function listarPorAgencia(idAgencia) {
    var instrucaoSql = `
        SELECT 
            r.id,
            r.titulo_relatorio AS nome,
            u.nome AS solicitante,
            r.status,
            a.nome AS agencia,
            r.dt_geracao
        FROM Relatorio r
        JOIN Usuario u ON r.fk_Usuario = u.id
        JOIN Agencia a ON u.fk_agencia = a.id
        WHERE a.id = ${idAgencia};
    `;
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar,
    listarTodos,
    editar,
    atualizarStatus,
    listarPorAgencia
};
