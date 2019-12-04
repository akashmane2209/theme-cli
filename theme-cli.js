#!/usr/bin/env node

const program = require("commander");
const { prompt } = require("inquirer");
const themeController = require("./controllers/themeController");

const createThemeQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter Theme Name . . ."
  },
  {
    type: "input",
    name: "group",
    message: "Enter Group Name . . ."
  }
];

const updateThemeQuestions = [
  ...createThemeQuestions,
  {
    type: "list",
    name: "componentname",
    choices: ["header", "footer", "productListing", "productDescription"],
    message: "Select component you want to update . . ."
  },
  {
    type: "editor",
    name: "contents",
    message: "Enter component template . . ."
  }
];

const setThemeQuestions = [
  {
    type: "input",
    name: "appId",
    message: "Enter App ID . . ."
  },
  {
    type: "input",
    name: "token",
    message: "Enter App Token . . ."
  },
  ...createThemeQuestions
];

const deleteThemeQuestion = [...createThemeQuestions];

program.version("0.0.1").description("Theme Command Line Interface");

program
  .command("init")
  .description("Initialize theme with default values")
  .action(async () => {
    try {
      const answers = await prompt(createThemeQuestions);
      await themeController.createTheme(answers);
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("update")
  .description("Update themes based on components")
  .action(async () => {
    try {
      const answers = await prompt(updateThemeQuestions);
      themeController.updateTheme(answers);
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("set")
  .description("Set Theme for given app ID")
  .action(async () => {
    try {
      const answers = await prompt(setThemeQuestions);
      themeController.setAppTheme(answers);
    } catch (error) {
      console.log(error);
    }
  });

program
  .command("delete")
  .description("Delete theme")
  .action(async () => {
    try {
      const answers = await prompt(deleteThemeQuestion);
      themeController.deleteThme(answers);
    } catch (error) {
      console.log(error);
    }
  });
program.parse(process.argv);
