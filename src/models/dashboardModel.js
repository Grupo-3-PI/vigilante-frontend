var database = require("../database/config")


function totalCrimes() {
    var instrucaoSql = `
        SELECT count(id) FROM Ocorrencias;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    totalCrimes,
    
};