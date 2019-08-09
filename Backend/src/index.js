const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

mongoose.connect("mongodb://192.168.99.100:27017/Game", { useNewUrlParser: true });

server.use(cors());
server.use(express.json());
server.use(routes);
server.listen(process.env.PORT || 3000);