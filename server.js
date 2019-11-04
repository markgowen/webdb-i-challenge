const express = require('express');

const AccountRouter = require('./data/routes/accounts-router');



const server = express();

server.use(express.json());
server.use('/api/accounts', AccountRouter);

module.exports = server;
