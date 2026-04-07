import chalk from "chalk";
import gradient from "gradient-string";
import boxen from "boxen";
import * as emoji from "node-emoji";
import type {Answers} from "../prompts/questions.js";
import {getCliVersion} from "../utils/cliVersion.js";

const version: string = getCliVersion();

const showBanner = () => {
  const gradientText = gradient("#36D1DC", "#5B86E5", "#DA22FF");

  const bannerContent = chalk.bold(`
  ${emoji.get("rocket")}  EXPRESS JETSTART  ${emoji.get("sparkles")}
  `);

  const boxedBanner = boxen(bannerContent, {
    padding: {top: 1, bottom: 1, left: 2, right: 2},
    borderStyle: "round",
    borderColor: "#36D1DC",
    margin: {top: 1, bottom: 0, left: 0, right: 0},
    float: "center",
  });

  console.log(boxedBanner);
  console.log(chalk.gray.dim("  " + "─".repeat(40)));
  console.log(gradient.pastel("  ⚡ Fast Express.js project scaffolding\n"));
  console.log(
    chalk.gray.dim(
      `  Version: ${chalk.white.bold(version)}  |  Created by ${chalk.cyan.bold("Chetan")}\n`,
    ),
  );
};

const showConfig = (answers: Answers) => {
  const configBox = boxen(
    `${chalk.white.bold(emoji.get("sparkles") + "  Project Configuration  " + emoji.get("sparkles"))}\n\n` +
      `${chalk.cyan("  Project Name:")}  ${chalk.white.bold(answers.projectName)}\n` +
      `${chalk.cyan("  Language:")}  ${chalk.white.bold(answers.language)}\n` +
      (answers.language === "javascript" && answers.mjsMode
        ? `${chalk.yellow("  Module System:")}  ${chalk.white.bold(answers.mjsMode)}\n`
        : "") +
      (answers.needViews && answers.views
        ? `${chalk.magenta("  Views:")}  ${chalk.white.bold(Array.isArray(answers.views) ? answers.views.join(", ") : answers.views)}\n`
        : "") +
      (answers.cors
        ? `${chalk.green("  CORS:")}  ${chalk.white.bold("Enabled")}\n`
        : "") +
      (answers.envConfig
        ? `${chalk.blue("  Environment:")}  ${chalk.white.bold(".env configured")}\n`
        : ""),
    {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "#DA22FF",
      float: "center",
    },
  );

  console.log(configBox);
};

export {showBanner, showConfig};
