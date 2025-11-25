var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/totalCrimes", function (req, res) {
    dashboardController.totalCrimes(req, res);
});

router.get("/totalCrimesMunicipio/:fkMunicipio", function (req, res) {
    dashboardController.totalCrimesMunicipio(req, res);
});

router.get("/totalCrimesTodosMunicipios", function (req, res) {
    dashboardController.totalCrimesTodosMunicipios(req, res);
});

router.get("/distribuicaoCrimes/:fkMunicipio", function (req, res) {
    dashboardController.distribuicaoCrimes(req, res);
});

router.get("/percentualCrimes/", function (req, res) {
    dashboardController.percentualCrimes(req, res);
});

router.get("/crimesAtividadePolicial/:fkMunicipio", function (req, res) {
    dashboardController.crimesAtividadePolicial(req, res);
});

module.exports = router;