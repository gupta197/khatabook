const express = require('express');
const basecampRouter = express.Router();
const basecampController = require('../controllers/basecampController');

basecampRouter.get('/getAccessToken', basecampController.getAccessToken);
basecampRouter.post('/getThreadsByProjectId', basecampController.getThreadsByProjectId);
basecampRouter.post('/getThreadDataById', basecampController.getThreadDataById);
basecampRouter.post('/getAllClients', basecampController.getAllClients);
basecampRouter.post('/broadcastMessages', basecampController.broadcastMessages)


exports.basecampRouter = basecampRouter;
