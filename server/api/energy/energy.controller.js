'use strict';

var _ = require('lodash'),
  ob = require('openbabel'),
  readJSON = require('./../../lib/read-json'),
  forceFields = require('./../../lib/forcefields');

// Calculate the energy
exports.index = function(req, res) {
  var molecule = readJSON(req.body);
  var forceField = forceFields[req.params.forcefield];

  forceField.setup(molecule);
  //forceField.systematicRotorSearch();

  res.json({
    molecule: molecule,
    energy: forceField.energy
  });
};
