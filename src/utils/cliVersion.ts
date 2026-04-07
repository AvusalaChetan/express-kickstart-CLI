import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

type PackageJson = {
  version?: string;
};

export const getCliVersion = (): string => {
  try {
    const currentFile = fileURLToPath(import.meta.url);
    const rootDir = path.resolve(path.dirname(currentFile), "..", "..");
    const packageJsonPath = path.join(rootDir, "package.json");
    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, "utf-8"),
    ) as PackageJson;

    return packageJson.version ?? "unknown";
  } catch {
    return "unknown";
  }
};
