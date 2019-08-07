const express = require('express');
const DevController = require('./controllers/DevController');
const DislikeController = require('./controllers/DislikeController');

const LikeController = require('./controllers/LikeController');

const routes = express.Router();

routes.post('/devs', DevController.store );
routes.get('/devs', DevController.index );
routes.post('/devs/:devId/like', LikeController.store );
routes.post('/devs/:devId/dislike', DislikeController.store );

module.exports = routes;