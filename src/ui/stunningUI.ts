#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import figlet from "figlet";
import boxen, {type Options as BoxenOptions} from "boxen";
import * as emoji from "node-emoji";
import {createSpinner} from "nanospinner";
import inquirer from "inquirer";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Color schemes
const colors = {
  primary: gradient("#36D1DC", "#5B86E5"),
  success: gradient("#56ab2f", "#a8e063"),
  warning: gradient("#f7971e", "#ffd200"),
  danger: gradient("#cb2d3e", "#ef473a"),
  info: gradient("#00c6ff", "#0072ff"),
  purple: gradient("#DA22FF", "#9733EE"),
  sunset: gradient("#FA8BFF", "#2BD2FF", "#2BFF88"),
  ocean: gradient("#2E3192", "#1BFFFF"),
};

// Create a styled box with gradient border effect
const createStyledBox = (
  content: string,
  options: {title?: string; color: any; padding?: number} = {
    color: colors.primary,
    padding: 1,
  },
) => {
  const boxOptions: BoxenOptions = {
    padding: options.padding || 1,
    margin: 1,
    float: "center",
    borderStyle: "round",
    borderColor: "#5B86E5",
    dimBorder: false,
  };

  const boxed = boxen(content, boxOptions);

  if (options.title) {
    const titleLine =
      options.color(`╭─ ${options.title} `) +
      "─".repeat(Math.max(0, 60 - options.title.length - 3));
    return titleLine + "\n" + boxed;
  }

  return boxed;
};

// Animated header with figlet and gradient
export const showAnimatedHeader = async () => {
  const logo = figlet.textSync("ExpressJet", {
    font: "ANSI Shadow",
    horizontalLayout: "default",
    verticalLayout: "default",
  });

  const animatedLogo = gradient.pastel.multiline(logo);

  console.log("\n");
  console.log(animatedLogo);
  console.log(
    boxen(
      chalk.white.bold("  The Ultimate Express.js Project Generator  ") +
        "\n" +
        chalk.gray("  ") +
        emoji.get("rocket") +
        chalk.gray("  Powered by Modern CLI Technologies  ") +
        emoji.get("sparkles"),
      {
        padding: 1,
        margin: 1,
        borderStyle: "double",
        borderColor: "#DA22FF",
        float: "center",
      },
    ),
  );
  console.log("\n");
};

// Gradient animated welcome
export const showWelcomeAnimation = async () => {
  const welcome = chalkAnimation.rainbow("Welcome to ExpressJet Start");
  welcome.start();
  await sleep(2000);
  welcome.stop();
};

// Feature showcase with icons
export const showFeatures = () => {
  const features = [
    {icon: "zap", name: "Lightning Fast", desc: "Generate projects in seconds"},
    {icon: "package", name: "Pre-configured", desc: "All dependencies ready"},
    {
      icon: "chart_with_upwards_trend",
      name: "Scalable",
      desc: "Production-ready structure",
    },
    {icon: "lock", name: "Secure", desc: "Best practices built-in"},
    {icon: "gear", name: "Customizable", desc: "Choose your stack"},
    {icon: "books", name: "Documented", desc: "Clear code comments"},
  ];

  const featureBox = features
    .map((f, i) => {
      const iconChar = emoji.get(f.icon) || f.icon;
      const colorFn = [
        colors.primary,
        colors.success,
        colors.info,
        colors.purple,
        colors.sunset,
        colors.ocean,
      ][i % 6]!;
      return colorFn(`${iconChar}  ${f.name.padEnd(15)}  ──  ${f.desc}`);
    })
    .join("\n");

  console.log(
    boxen(featureBox, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "#36D1DC",
      float: "center",
      title: chalk.white.bold("Features"),
    }),
  );
};

// Multi-step progress with spinners
export const showProgressSequence = async (steps: string[]) => {
  for (const step of steps) {
    const spinner = createSpinner(gradient.pastel(step)).start();
    await sleep(800);
    const successGradient = gradient("#56ab2f", "#a8e063");
    spinner.success({text: successGradient(step + " completed")});
  }
};

// Interactive menu with custom styling
export const showInteractiveMenu = async () => {
  const questions: any = [
    {
      type: "list",
      name: "action",
      message: colors.purple(
        `${emoji.get("thinking")}  What would you like to do?`,
      ),
      choices: [
        new inquirer.Separator(chalk.gray("─".repeat(40))),
        {
          name: `${emoji.get("rocket")}  Create New Project`,
          value: "create",
        },
        {
          name: `${emoji.get("gear")}  Project Settings`,
          value: "settings",
        },
        {
          name: `${emoji.get("books")}  Documentation`,
          value: "docs",
        },
        {
          name: `${emoji.get("star")}  Templates Gallery`,
          value: "templates",
        },
        new inquirer.Separator(chalk.gray("─".repeat(40))),
        {
          name: `${emoji.get("door")}  Exit`,
          value: "exit",
        },
      ],
      pageSize: 8,
    },
  ];

  const {action} = await inquirer.prompt(questions);
  return action;
};

// Status dashboard display
export const showDashboard = () => {
  const stats = [
    {label: "Projects Created", value: "1,247", icon: "package"},
    {label: "Happy Users", value: "892", icon: "smile"},
    {label: "Templates", value: "24", icon: "clipboard"},
    {label: "Version", value: "1.0.1", icon: "tag"},
  ];

  const statsLine = stats
    .map((s) => {
      const iconChar = emoji.get(s.icon) || s.icon;
      return colors.info(
        `${iconChar}  ${s.label}: ${chalk.white.bold(s.value)}`,
      );
    })
    .join(chalk.gray("  │  "));

  console.log(
    boxen(statsLine, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "#00c6ff",
      float: "center",
    }),
  );
};

// Success celebration
export const showSuccessCelebration = async (projectName: string) => {
  const celebration = figlet.textSync("Success!", {
    font: "Slant",
  });

  console.log("\n");
  console.log(colors.success.multiline(celebration));

  const message = boxen(
    chalk.white.bold(
      `${emoji.get("tada")}  Project "${projectName}" created successfully!  ${emoji.get("tada")}`,
    ) +
      "\n\n" +
      colors.info("Next steps:") +
      "\n" +
      chalk.gray("  cd ") +
      chalk.cyan(projectName) +
      "\n" +
      chalk.gray("  npm install") +
      "\n" +
      chalk.gray("  npm run dev") +
      "\n\n" +
      colors.success(emoji.get("rocket") + "  Happy coding!"),
    {
      padding: 2,
      margin: 1,
      borderStyle: "double",
      borderColor: "#56ab2f",
      float: "center",
    },
  );

  console.log(message);
};

// Loading screen with multiple spinners
export const showLoadingScreen = async (message: string) => {
  const spinner = createSpinner(gradient.pastel(message)).start();
  await sleep(2000);
  return spinner;
};

// Error display with style
export const showError = (message: string) => {
  console.log(
    boxen(chalk.red.bold(`${emoji.get("x")}  Error: ${message}`), {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "#cb2d3e",
      float: "center",
    }),
  );
};

// Warning display
export const showWarning = (message: string) => {
  console.log(
    boxen(chalk.yellow.bold(`${emoji.get("warning")}  Warning: ${message}`), {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "#f7971e",
      float: "center",
    }),
  );
};

// Info display
export const showInfo = (message: string) => {
  console.log(
    boxen(
      chalk.cyan.bold(`${emoji.get("information_source")}  Info: ${message}`),
      {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "#00c6ff",
        float: "center",
      },
    ),
  );
};

// Full demo showcasing all UI elements
export const runDemo = async () => {
  console.clear();

  // 1. Animated header
  await showAnimatedHeader();
  await showWelcomeAnimation();

  // 2. Dashboard stats
  showDashboard();

  // 3. Features showcase
  showFeatures();

  // 4. Progress demonstration
  console.log("\n");
  await showProgressSequence([
    "Initializing core modules",
    "Loading configuration",
    "Preparing templates",
    "Ready for action",
  ]);

  // 5. Interactive menu
  const action = await showInteractiveMenu();

  // 6. Show appropriate message
  if (action === "exit") {
    const goodbye = figlet.textSync("Goodbye!", {
      font: "Slant",
    });
    console.log("\n");
    console.log(colors.purple.multiline(goodbye));
  } else {
    showInfo(`Selected: ${action}`);
  }
};

// Export all utilities
export {colors, createStyledBox};
