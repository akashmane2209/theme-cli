const express = require("express");
const router = express.Router();

const appController = require("../controllers/appController");

router.route("/").post(appController.addApp);

module.exports = router;
