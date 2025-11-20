var dashboardModel = require("../models/dashboardModel");

function totalCrimes(req, res) {
    dashboardModel.totalCrimes().then(function (resultadoTotalCrimes) {
        res.json(resultadoTotalCrimes[0]);
    });
}

function totalCrimesMunicipio(req, res) {
    dashboardModel.totalCrimesMunicipio().then(function (resultadoTotalCrimesMunicipio) {
        res.json(resultadoTotalCrimesMunicipio[0]);
    });
}

function totalCrimesMunicipio(req, res) {
    fkMunicipio = req.params.fkMunicipio;
    dashboardModel.totalCrimesMunicipio(fkMunicipio).then(function (resultadoTotalCrimesMunicipio) {
        // console.log(res.json(resultadoTotalCrimesMunicipio[0]));
        
        res.json(resultadoTotalCrimesMunicipio[0]);
    });
}

module.exports = {
    totalCrimes,
    totalCrimesMunicipio,
}