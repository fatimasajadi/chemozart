'use strict';

var _ = require('lodash'),
  ob = require('openbabel'),
  conversion = new ob.Conversion(),
  readJSON = require('./../../lib/read-json');

// Get Json of given data
exports.import = function (req, res) {
  res.json([]);
};

// Convert Json into given format
exports.export = function (req, res) {
  try {
    var molecule = readJSON(req.body);
    var format = req.params.format;
    var data = conversion.setOutFormat(format).write(molecule);
    res.end(data);
  } catch (e) {
    res.end(e.getMessage());
  }
};
