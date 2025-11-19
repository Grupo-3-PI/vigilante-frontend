var dashboardModel = require("../models/dashboardModel");

function totalCrimes(req, res) {

    dashboardModelModel.totalCrimes()
        .then(
            function (resultadoTotalCrimes) {
                console.log(`\nResultados encontrados: ${resultadoTotalCrimes.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoTotalCrimes)}`);

                if (resultadoTotalCrimes.length >= 1) {
                    console.log(resultadoTotalCrimes);
                    res.json(resultadoTotalCrimes);
                } else if (resultadoTotalCrimes.length == 0) {
                    res.status(403).send("Nenhuma ocorrência crime encontrada!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao contar total de crimes", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

module.exports = {
    totalCrimes,
}