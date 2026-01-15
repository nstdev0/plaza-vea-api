import { config } from "dotenv";

config();

export const AppConfig = {
  PORT: process.env.PORT || 4000,
  VTEX_API_URL: process.env.VTEX_API_URL,
  CRON_SECRET: process.env.CRON_SECRET,
};
