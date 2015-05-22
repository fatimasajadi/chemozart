'use strict';

var express = require('express');
var controller = require('./conversion.controller');

var router = express.Router();

router.post('/export/:format(cml|pdb|mol|mol2|smiles|hin)', controller.export);
router.post('/import/:format(cml|pdb|mol|mol2|smiles|hin)', controller.import);

module.exports = router;
