var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/totalCrimes", function (req, res) {
    dashboardController.totalCrimes(req, res);
});

router.get("/totalCrimesMunicipio/:fkMunicipio", function (req, res) {
    dashboardController.totalCrimesMunicipio(req, res);
});

router.get("/totalCrimesTodosMunicipios/:ano", function (req, res) {
    dashboardController.totalCrimesTodosMunicipios(req, res);
});

router.get("/distribuicaoCrimes/:fkMunicipio", function (req, res) {
    dashboardController.distribuicaoCrimes(req, res);
});

router.get("/percentualCrimes/:ano", function (req, res) {
    dashboardController.percentualCrimes(req, res);
});

router.get("/crimesAtividadePolicial/:fkMunicipio/:ano", function (req, res) {
    dashboardController.crimesAtividadePolicial(req, res);
});

router.get("/percentualUltimoMes/:fkMunicipio/:ano", function (req, res) {
    dashboardController.percentualUltimoMes(req, res);
});

router.get("/percentualTrimestrePassado/:fkMunicipio/:ano", function (req, res) {
    dashboardController.percentualTrimestrePassado(req, res);
});

module.exports = router;