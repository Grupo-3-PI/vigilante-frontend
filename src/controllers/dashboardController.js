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
    ano = req.params.ano;
    dashboardModel.totalCrimesTodosMunicipios(ano).then(function (resultadoTotalCrimesTodosMunicipios) {
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
    ano = req.params.ano;
    dashboardModel.percentualCrimes(ano).then(function (resultadoPercentualCrimes) {
        res.json(resultadoPercentualCrimes);
    });
}

function crimesAtividadePolicial(req, res) {
    fkMunicipio = req.params.fkMunicipio;
    ano = req.params.ano;
    dashboardModel.crimesAtividadePolicial(fkMunicipio, ano).then(function (resultadoCrimesAtividadePolicial) {
        res.json(resultadoCrimesAtividadePolicial);
    });
}

function percentualUltimoMes(req, res) {
    fkMunicipio = req.params.fkMunicipio;
    ano = req.params.ano;
    dashboardModel.percentualUltimoMes(fkMunicipio, ano).then(function (resultadopercentualUltimoMes) {
        res.json(resultadopercentualUltimoMes);
    });
}

function percentualTrimestrePassado(req, res) {
    fkMunicipio = req.params.fkMunicipio;
    ano = req.params.ano;
    dashboardModel.percentualTrimestrePassado(fkMunicipio, ano).then(function (resultadopercentualTrimestrePassado) {
        res.json(resultadopercentualTrimestrePassado);
    });
}

module.exports = {
    totalCrimes,
    totalCrimesMunicipio,
    totalCrimesTodosMunicipios,
    distribuicaoCrimes,
    percentualCrimes,
    crimesAtividadePolicial,
    percentualUltimoMes,
    percentualTrimestrePassado
}