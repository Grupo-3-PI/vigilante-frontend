var database = require("../database/config")

function autenticar(email, senha) {
    console.log("Autenticando admin...", email, senha);

    var instrucaoSql = `
        SELECT id, nome, email 
        FROM Administrador 
        WHERE email = '${email}' AND senha = '${senha}';
    `;

    console.log("Executando SQL: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar
}
