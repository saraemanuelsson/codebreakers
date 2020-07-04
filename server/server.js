const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_routers.js');

app.use(bodyParser.json());

