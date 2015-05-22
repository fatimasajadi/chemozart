'use strict';

var _ = require('lodash'),
  ob = require('openbabel'),
  conversion = new ob.Conversion(),
  readJSON = require('./../../lib/read-json');

// Convert Json into given format
exports.export = function (req, res) {
  try {
    var molecule = readJSON(req.body);
    var format = req.params.format;
    var data = conversion.setOutFormat(format).write(molecule);
    res.send(200, data);
  } catch (e) {
    res.send(500, e.getMessage());
  }
};

// Convert given format to Json
exports.import = function (req, res) {
  try {
    var format = req.params.format;
    var molecule = conversion.setInFormat(format).read(req.body.data);
    res.json(molecule);
  } catch (e) {
    res.send(500, e);
  }
};
