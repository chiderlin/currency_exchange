const express = require('express');
const dotenv = require('dotenv');
const helment = require('helmet');
const cors = require('cors');
const app = express();

dotenv.config();

const router = require('./routes');

app.use(helment());
app.use(cors());
app.use(router);

module.exports = app;
