import { config } from "dotenv";

config();

export const AppConfig = {
  PORT: process.env.PORT || 4000,
  MAKRO_API_URL: process.env.MAKRO_API_URL,
  WONG_API_URL: process.env.WONG_API_URL,
  CRON_SECRET: process.env.CRON_SECRET,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(",") || [],
};
