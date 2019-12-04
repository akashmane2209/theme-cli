const config = require("config");
const { App } = require("../models/Application");

exports.addApp = async (req, res) => {
  try {
    const { name, token } = req.body;
    const app = await new App({
      name,
      token
    }).save();
    res.status(201).json({ message: "App created", name, token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
    console.log("ERROR:", error.message);
  }
};

exports.validateApp = async (appId, token) => {
  try {
    const app = await App.findById(appId);
    console.log("\x1b[33m", "Validating App . . .");
    if (app) {
      return app.token == token ? app : undefined;
    }
    return undefined;
  } catch (error) {
    console.log(error);
  }
};

exports.setAppTheme = async (appId, themeId) => {
  try {
    console.log("\x1b[33m", "Setting App Theme");
    const app = await App.findByIdAndUpdate(appId, {
      currentTheme: themeId
    });
  } catch (error) {
    console.log(error);
  }
};
