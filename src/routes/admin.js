var express = require("express");
var router = express.Router();

var adminController = require("../controllers/adminController");

router.post("/autenticar", function (req, res) {
    adminController.autenticar(req, res);
});

module.exports = router;
