require('dotenv').config();
require('colors')
const AppServer = require('./src/server/app.server');


const server = new AppServer();
server.listen()
