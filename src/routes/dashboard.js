var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/totalCrimes", function (req, res) {
    dashboardController.totalCrimes(req, res);
});

module.exports = router;