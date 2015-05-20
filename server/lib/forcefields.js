var ob = require('openbabel');

module.exports = {
  mmff94: ob.ForceField.findForceField('mmff94'),
  uff: ob.ForceField.findForceField('uff'),
  ghemical: ob.ForceField.findForceField('ghemical'),
  mm2: ob.ForceField.findForceField('mm2')
};
