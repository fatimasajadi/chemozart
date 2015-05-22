'use strict';

var express = require('express');
var controller = require('./energy.controller');

var router = express.Router();

router.post('/:forcefield(mmff94|ghemical|uff|mm2)', controller.index);

module.exports = router;
