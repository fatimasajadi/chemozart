"use strict";

angular
  .module("chemartApp")
  .factory("conversion", function (
    moleculeDrawer,
    canvas,
    $download,
    storage,
    notify
  ) {
    return {
      formats: {
        mol2: "Sybyl Mol2",
        cml: "CML",
        mol: "MDL SDFile",
        pdb: "PDB",
        smiles: "SMILES Notation",
        hin: "Hyperchem File",
      },
      export: function (type) {
        var molecule = JSON.parse(
          JSON.stringify(canvas.getMolecule().toJSON())
        );
        var conv = new OpenBabel.ObConversionWrapper();
        var obMol = JSONToOB(molecule);

        try {
          conv.setOutFormat("", type);
          var outData = conv.writeString(obMol, false);
          $download(outData, storage.current + "." + type);
        } finally {
          conv.delete();
          obMol.delete();
        }
      },
      import: function (file) {
        function getExtension(filename) {
          return filename.substr(filename.lastIndexOf(".") + 1);
        }
        var type = getExtension(file.name);

        if (
          ["cml", "hin", "mol", "mol2", "smiles", "pdb"].indexOf(type) === -1
        ) {
          return notify({
            message: "The file selected is not supported.",
            classes: ["error"],
          });
        }

        var fr = new FileReader();
        fr.readAsBinaryString(file);

        fr.onload = function (e) {
          var inData = e.target.result;
          var conv = new OpenBabel.ObConversionWrapper(); // create ObConversionWrapper instance
          try {
            conv.setInFormat("", type);

            var obMol = new OpenBabel.OBMol();
            conv.readString(obMol, inData);

            var json = OBToJSON(obMol);
            var mol = Chem.Molecule.readJSON(json);
            moleculeDrawer.draw(mol);

            notify({
              message: 'The file "' + file.name + '" has been imported',
              classes: ["success"],
            });
          } finally {
            obMol.delete();
            conv.delete();
          }
        };
      },
    };
  });

function JSONToOB(molecule) {
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

function OBToJSON(mol) {
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
    var bond = mol.GetBond(i + 1);
    result.bonds.push({
      begin: bond.GetBeginAtomIdx(),
      end: bond.GetEndAtomIdx(),
      order: bond.GetBondOrder(),
    });
  }

  return result;
}
