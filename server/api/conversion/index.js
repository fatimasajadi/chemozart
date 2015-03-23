'use strict';

var express = require('express');
var controller = require('./conversion.controller');

var router = express.Router();

router.post('/import', controller.import);
router.post('/export/:format(cml|pdb|mol|mol2|smiles|hin)', controller.export);

module.exports = router;
