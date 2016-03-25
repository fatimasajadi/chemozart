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
