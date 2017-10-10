// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { pricePerHour } from '../app/components/modal/stopModal.component';

export const environment = {
  production: false,
  backEndBaseUrl: "https://172.16.121.187:8443/",
  pricePerHour: 5
};
