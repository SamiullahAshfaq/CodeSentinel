import axiosInstance from "./axios.js";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await axiosInstance.post("/execute", {
      language: languageConfig.language,
      code,
    });

    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return {
        success: false,
        output: error.response.data.output || "",
        error: error.response.data.error || "Failed to execute code",
      };
    }

    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}
