const config = require("config");
const assert = require("assert"); // N.B: Assert module comes bundled with Node.js.
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { Theme } = require("../models/Theme");
const { App } = require("../models/Application");
const appController = require("../controllers/appController");
const { createDefaultThemeObject } = require("../utils/theme");
const fs = require("fs");
const MONGO_CONNECTION = config.get("db.connection-string");
const db = mongoose.connect(MONGO_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

exports.setAppTheme = async answerObject => {
  try {
    const { appId, token, name, group } = answerObject;
    const app = await appController.validateApp(appId, token);
    if (app) {
      console.log("\x1b[33m", "Validating Theme . . .");
      const theme = await this.findTheme(name, group);
      if (theme) {
        await appController.setAppTheme(app._id, theme._id);
        console.log("\x1b[32m", "Theme Applied Successfully!");
      } else {
        console.error("\x1b[31m", "Invalid Theme Name or Group");
      }
    } else {
      console.error("\x1b[31m", "Invalid App ID or Token");
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

exports.createTheme = async themeOptions => {
  try {
    const themObj = createDefaultThemeObject(themeOptions);
    const theme = await Theme.create(themObj);
    console.log("\x1b[32m", "Theme Created Successfully!");
    console.log("------------------------Note------------------------");
    console.log("\x1b[36m", "Theme ID : " + theme._id);
    console.log("\x1b[36m", "Theme Name : " + theme.name);
    console.log("\x1b[36m", "Group Name : " + theme.group);
    console.log(
      "\x1b[32m",
      "----------------------------------------------------"
    );
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

exports.updateTheme = async answers => {
  try {
    const { name, group, componentname, contents } = answers;

    const templateUnformatted = contents;
    let template = templateUnformatted.replace(/\s+/g, "");
    const data = {
      [componentname]: {
        is_active: false,
        template
      }
    };

    // const theme = await Theme.findByIdAndUpdate(app.currentTheme, data);
    const theme = await this.findTheme(name, group);
    if (theme) {
      await Theme.findByIdAndUpdate(theme._id, data);
      console.info("\x1b[32m", name + " Theme updated successfully");
    } else {
      console.error("\x1b[31m", "Invalid Theme Name or Group");
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

exports.deleteThme = async answers => {
  try {
    const { name, group } = answers;
    const theme = await this.findTheme(name, group);
    if (theme) {
      console.log("\x1b[33m", "Checking dependencies . . .");
      const app = await App.findOne({ currentTheme: theme._id });
      if (!app) {
        await Theme.findByIdAndDelete(theme._id);
        console.info("\x1b[32m", name + " Theme deleted successfully");
      } else {
        console.error(
          "\x1b[31m",
          "An app is currently using theme. Delete failed "
        );
      }
    } else {
      console.error("\x1b[31m", "Invalid Theme Name or Group");
    }
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
};

exports.findTheme = async (name, group) => {
  console.log("\x1b[33m", "Finding Theme . . .");
  const theme = await Theme.findOne({
    name: name.toLowerCase(),
    group: group.toLowerCase()
  });
  return theme ? theme : undefined;
};
