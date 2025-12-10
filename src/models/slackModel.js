var database = require("../database/config");


function alterarCanal(fkUsuario, canal) {
    var instrucaoSql = `
        UPDATE AvisosSlack
        SET canal = '${canal}'
        WHERE fk_Usuario = ${fkUsuario};
    `;
    return database.executar(instrucaoSql);
}

function alterarStatus(fkUsuario, status) {
    var instrucaoSql = `
        UPDATE AvisosSlack
        SET status = '${status}'
        WHERE fk_Usuario = ${fkUsuario};
    `;
    return database.executar(instrucaoSql);
}

function alterarNotificacoes(fkUsuario, info, warn, error) {
    var instrucaoSql = `
        UPDATE AvisosSlack
        SET info = '${info}',
        warn = '${warn}',
        error = '${error}'
        WHERE fk_Usuario = ${fkUsuario};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    alterarCanal,
    alterarStatus,
    alterarNotificacoes
};
