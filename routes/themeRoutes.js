const express = require("express");

const router = require("router");

const themeController = require("../controllers/themeController");

router.route("/theme").get(themeController);
