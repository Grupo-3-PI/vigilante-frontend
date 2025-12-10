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
    filtro = req.params.filtro;
    dashboardModel.percentualCrimes(ano, filtro).then(function (resultadoPercentualCrimes) {
        res.json(resultadoPercentualCrimes);
    });
}

function crimesAtividadePolicial(req, res) {
    fkMunicipio = req.params.fkMunicipio;
    ano = req.params.ano;
    filtro = req.params.filtro;
    dashboardModel.crimesAtividadePolicial(fkMunicipio, ano, filtro).then(function (resultadoCrimesAtividadePolicial) {
        res.json(resultadoCrimesAtividadePolicial);
    });
}

function percentualUltimoMes(req, res) {
    fkMunicipio = req.params.fkMunicipio;
    ano = req.params.ano;
    filtro = req.params.filtro;
    dashboardModel.percentualUltimoMes(fkMunicipio, ano, filtro).then(function (resultadopercentualUltimoMes) {
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

function percentualProdutividadePolicial(req, res) {
    fkMunicipio = req.params.fkMunicipio;
    dashboardModel.percentualProdutividadePolicial(fkMunicipio).then(function (resultadopercentualProdutividadePolicial) {
        res.json(resultadopercentualProdutividadePolicial);
    });
}

function filtros(req, res) {
    dashboardModel.filtros().then(function (resultadoFiltros) {
        res.json(resultadoFiltros);
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
    percentualTrimestrePassado,
    percentualProdutividadePolicial,
    filtros,
}