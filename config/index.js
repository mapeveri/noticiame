const path = require('path');
const dotenv = require('dotenv');

const pathEnv = path.join(__dirname, '.env');
dotenv.config({ path: pathEnv });
