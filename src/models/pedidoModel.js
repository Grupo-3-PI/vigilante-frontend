var database = require("../database/config")

function cadastrar(status, fk_usuario, fk_administrador) {
    var instrucaoSql = `
            INSERT INTO Pedidos(status, fk_usuario, fk_administrador) VALUES('${status}', ${fk_usuario}, ${fk_administrador});
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    console.log("Listando todos os pedidos com dados completos...");

    var instrucaoSql = `
        SELECT 
            p.id,
            p.status,
            DATE_FORMAT(p.data_criacao, '%d/%m/%Y %H:%i') AS data_criacao,
            u.nome AS solicitante,
            e.nome AS agencia
        FROM Pedidos p
        JOIN Usuario u
            ON p.fk_usuario = u.id
        JOIN Agencia e
            ON u.fk_agencia = e.id
        ORDER BY p.data_criacao DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorAgencia(idAgencia) {
    console.log("Listando pedidos da agência:", idAgencia);

    var instrucaoSql = `
        SELECT 
            p.id,
            p.status,
            p.data_criacao,
            u.nome AS nome_usuario,
            u.fk_agencia
        FROM Pedidos p
        JOIN Usuario u
            ON p.fk_usuario = u.id
        WHERE u.fk_agencia = ${idAgencia}
        ORDER BY p.data_criacao DESC;
    `;

    return database.executar(instrucaoSql);
}

function aceitar(id) {
    var instrucaoSql = `
        UPDATE Pedidos SET status = "Aprovado" WHERE id = ${id};
    `
    return database.executar(instrucaoSql);
}

function recusar(id) {
    var instrucaoSql = `
        UPDATE Pedidos SET status = "Recusado" WHERE id = ${id};
    `
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    listar,
    listarPorAgencia,
    aceitar,
    recusar
};