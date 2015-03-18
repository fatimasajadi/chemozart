'use strict';

var express = require('express');
var controller = require('./geometry.controller');

var router = express.Router();

router.post('/build', controller.build);
router.post('/addhydrogens', controller.addHydrogens);

module.exports = router;
