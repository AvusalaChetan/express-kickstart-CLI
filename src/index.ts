#!/usr/bin/env node

import {
  showAnimatedHeader,
  showWelcomeAnimation,
  showFeatures,
  showDashboard,
  showProgressSequence,
  showSuccessCelebration,
  showError,
  showWarning,
  showInfo,
  showLoadingScreen,
  runDemo,
} from "./ui/stunningUI.js";
import createProject from "./create.js";
import askQuestions from "./prompts/questions.js";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  try {
    // Clear console for clean slate
    console.clear();

    // Show stunning animated header
    await showAnimatedHeader();
    await showWelcomeAnimation();

    // Display dashboard stats
    showDashboard();

    // Show features
    showFeatures();

    // Get user answers with styled prompts
    const answers = await askQuestions();

    await sleep(500);

    if (answers.projectName) {
      // Show progress sequence
      console.log("\n");
      await showProgressSequence([
        "Creating project structure",
        "Installing dependencies",
        "Configuring TypeScript",
        "Setting up ESLint",
        "Finalizing setup",
      ]);

      // Create the project
      await createProject(answers);

      // Success celebration
      await showSuccessCelebration(answers.projectName);
    }
  } catch (error) {
    showError(`Something went wrong: ${error instanceof Error ? error.message : "Unknown error"}`);
    process.exit(1);
  }
};

// Run demo mode with --demo flag
if (process.argv.includes("--demo")) {
  runDemo();
} else {
  main();
}
