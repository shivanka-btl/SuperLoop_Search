import DEV_ENV from './env/env-dev';
import PROD_ENV from './env/env-prod';
import TEST_ENV from './env/env-test';

let environment;

switch (process.env.NODE_ENV) {
  case 'development':
    environment = DEV_ENV;
    break;
  case 'production':
    environment = PROD_ENV;
    break;
  case 'test':
    environment = TEST_ENV;
    break;
  default:
    environment = DEV_ENV;
    break;
}

export default environment;
