'use strict';


var JSONToOB = function JSONToOB(input) {
  var molecule = JSON.parse(
    JSON.stringify(input.toJSON())
  );
  var obMol = new OpenBabel.OBMol();

  var atoms = molecule.atoms.map(function (atom) {
    var obAtom = obMol.NewAtom();
    obAtom.SetAtomicNum(atom.atomicNumber);
    obAtom.SetIdx(atom.index);
    obAtom.SetVector(atom.position.x, atom.position.y, atom.position.z);
    return obAtom;
  });

  molecule.bonds.forEach(function (bond) {
    var obBond = obMol.NewBond();
    obBond.SetBondOrder(bond.order);
    obBond.SetBegin(
      atoms.find(function (atom) {
        return atom.GetIdx() == bond.begin;
      })
    );
    obBond.SetEnd(
      atoms.find(function (atom) {
        return atom.GetIdx() == bond.end;
      })
    );
    return obBond;
  });

  return obMol;
}

var OBToJSON = function OBToJSON(mol) {
  var result = { atoms: [], bonds: [] };
  var atomCount = mol.NumAtoms();
  var bondCount = mol.NumBonds();

  for (var i = 0; i < atomCount; ++i) {
    var atom = mol.GetAtom(i + 1);
    result.atoms.push({
      index: atom.GetIdx(),
      atomicNumber: atom.GetAtomicNum(),
      position: {
        x: atom.GetX(),
        y: atom.GetY(),
        z: atom.GetZ(),
      },
    });
  }

  for (var i = 0; i < bondCount; ++i) {
    var bond = mol.GetBond(i);
    result.bonds.push({
      begin: bond.GetBeginAtomIdx(),
      end: bond.GetEndAtomIdx(),
      order: bond.GetBondOrder(),
    });
  }

  return result;
}

window.OpenBabel = OpenBabelModule();

angular.module('chemartApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'cfp.hotkeys',
  'lr.upload',
  'cgNotify',
  'ngFileUpload'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');
  })
  .run(function (notify) {
    notify.config({
      duration: 3000
    });
  });
