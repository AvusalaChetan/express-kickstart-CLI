import chalk from "chalk";
import { error as errorLog } from "console";
import fs from "fs";
import { createSpinner, type Spinner } from "nanospinner";
import path from "path";
import { fileURLToPath } from "url";
import { createFolders, createRootFiles } from "./utils/fileCreatingUtils.js";
import type { Answers } from "./prompts/questions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const templatePath = path.join(__dirname, "..", "src", "templates");

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createProject = async ({
  projectName,
  language,
  framework,
  needViews,
  views,
  mjsMode,
}: Answers): Promise<void> => {
  const spinner: Spinner = createSpinner(chalk.cyan("Creating project...")).start();
  try {
    await sleep(2000);
    fs.mkdirSync(projectName);

    createFolders(projectName, spinner);
    createRootFiles(
      projectName,
      language,
      spinner,
      framework,
      needViews,
      views || [],
      mjsMode,
    );

    if (needViews) fs.mkdirSync(`${projectName}/views`);

    spinner.success({ text: chalk.green(`Project "${projectName}" created successfully!`) });
  } catch (error) {
    errorLog("error", (error as Error).message.toString());
    if (error instanceof Error) {
      spinner.error({
        text: chalk.red(`Project "${projectName}" is already created`),
      });
    }
  }
};

export default createProject;
