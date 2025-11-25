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
        res.json(resultadoTotalCrimesMunicipio[0]);
    });
}

function totalCrimesTodosMunicipios(req, res) {
    dashboardModel.totalCrimesTodosMunicipios().then(function (resultadoTotalCrimesTodosMunicipios) {
        res.json(resultadoTotalCrimesTodosMunicipios);
    });
}

function distribuicaoCrimes(req, res) {
    fkMunicipio = req.params.fkMunicipio;
    dashboardModel.distribuicaoCrimes(fkMunicipio).then(function (resultadoDistribuicaoCrimes) {
        res.json(resultadoDistribuicaoCrimes);
    });
}

function percentualCrimes(req, res) {
    dashboardModel.percentualCrimes().then(function (resultadoPercentualCrimes) {
        res.json(resultadoPercentualCrimes);
    });
}

function crimesAtividadePolicial(req, res) {
    fkMunicipio = req.params.fkMunicipio;
    dashboardModel.crimesAtividadePolicial(fkMunicipio).then(function (resultadoCrimesAtividadePolicial) {
        res.json(resultadoCrimesAtividadePolicial);
    });
}

module.exports = {
    totalCrimes,
    totalCrimesMunicipio,
    totalCrimesTodosMunicipios,
    distribuicaoCrimes,
    percentualCrimes,
    crimesAtividadePolicial,
}