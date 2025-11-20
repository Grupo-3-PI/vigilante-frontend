var database = require("../database/config")


function totalCrimes() {
    var instrucaoSql = `SELECT count(id) FROM Ocorrencias WHERE tipo_ocorrencia = 'Crime';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function totalCrimesMunicipio(fkMunicipio) {
    var instrucaoSql = `SELECT count(id) FROM Ocorrencias WHERE fk_municipio = ${fkMunicipio} AND tipo_ocorrencia = 'Crime';`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    totalCrimes,
    totalCrimesMunicipio,
    
};