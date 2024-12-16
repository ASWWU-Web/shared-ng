// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import type { Environment } from "./types";

// You can run the server in production mode by running `ng serve -prod`.
export const environment = {
  environment: "development",
  API_URL: "https://localhost/server",
  BASE_URL: "https://localhost",
} satisfies Environment;
