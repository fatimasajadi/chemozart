'use strict';

var express = require('express');
var controller = require('./build.controller.js');

var router = express.Router();

router.post('/build', controller.build);
router.post('/addhydrogens', controller.addHydrogens);

module.exports = router;
