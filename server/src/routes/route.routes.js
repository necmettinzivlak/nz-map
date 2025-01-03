const express = require('express');
const router = express.Router();
const routeController = require('../controllers/route.controller');

router.post('/calculate', routeController.calculateRoute);

module.exports = router; 