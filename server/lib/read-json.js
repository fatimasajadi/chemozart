var ob = require('openbabel');

var conversion = new ob.Conversion().setOutFormat('mol2').setInFormat('mol2');

module.exports = function readJSON(object) {
  var molecule = ob.Molecule.fromJSON(object);
  return conversion.read(conversion.write(molecule));
};
