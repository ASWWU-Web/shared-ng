import type { Environment } from "./types";

export const environment = {
  production: true,
  API_URL: "https://staging.aswwumask.com/server",
  BASE_URL: "https://staging.aswwumask.com",
  COOKIE_DOMAIN: ".aswwumask.com",
} satisfies Environment;
