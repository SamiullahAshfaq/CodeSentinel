import dotenv from "dotenv";

dotenv.config({ quiet: true });

const throwError = (key) => {
  throw new Error(`Missing required environment variable: ${key}`);
};

export const ENV = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL || throwError("DB_URL"),
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY || throwError("INNGEST_EVENT_KEY"),
  INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY || throwError("INNGEST_SIGNING_KEY"),
  STREAM_API_KEY: process.env.STREAM_API_KEY || throwError("STREAM_API_KEY"),
  STREAM_API_SECRET: process.env.STREAM_API_SECRET || throwError("STREAM_API_SECRET"),
};
