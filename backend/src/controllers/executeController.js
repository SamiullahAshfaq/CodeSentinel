import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const LANGUAGE_CONFIG = {
  javascript: {
    fileName: "main.js",
    run: async (filePath, workingDir) => runCommand("node", [filePath], workingDir),
  },
  python: {
    fileName: "main.py",
    run: async (filePath, workingDir) => runCommand("python3", [filePath], workingDir),
  },
  java: {
    fileName: "Main.java",
    run: async (filePath, workingDir) => {
      const compileResult = await runCommand("javac", [filePath], workingDir);

      if (!compileResult.success) {
        return compileResult;
      }

      return runCommand("java", ["-cp", workingDir, "Main"], workingDir);
    },
  },
};

const EXECUTION_TIMEOUT_MS = 5000;

async function runCommand(command, args, cwd) {
  try {
    const { stdout, stderr } = await execFileAsync(command, args, {
      cwd,
      timeout: EXECUTION_TIMEOUT_MS,
      maxBuffer: 1024 * 1024,
    });

    const output = stdout?.toString() || "";
    const errorOutput = stderr?.toString() || "";

    if (errorOutput) {
      return {
        success: false,
        output,
        error: errorOutput,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    const stdout = error.stdout?.toString() || "";
    const stderr = error.stderr?.toString() || "";

    if (error.killed && error.signal === "SIGTERM") {
      return {
        success: false,
        output: stdout,
        error: "Execution timed out after 5 seconds",
      };
    }

    return {
      success: false,
      output: stdout,
      error: stderr || error.message || "Execution failed",
    };
  }
}

export async function executeCode(req, res) {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({
      success: false,
      error: "Language and code are required",
    });
  }

  const languageConfig = LANGUAGE_CONFIG[language];

  if (!languageConfig) {
    return res.status(400).json({
      success: false,
      error: `Unsupported language: ${language}`,
    });
  }

  const workingDir = await mkdtemp(path.join(tmpdir(), "code-sentinel-"));
  const filePath = path.join(workingDir, languageConfig.fileName);

  try {
    await writeFile(filePath, code, "utf8");
    const result = await languageConfig.run(filePath, workingDir);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to execute code",
    });
  } finally {
    await rm(workingDir, { recursive: true, force: true });
  }
}