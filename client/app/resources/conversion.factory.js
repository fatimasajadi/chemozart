'use strict';

angular.module('chemartApp')
  .factory('conversion', function ($http, moleculeDrawer, canvas, $download, storage) {

    return {
      "formats": {
        "mol2": "Sybyl Mol2",
        "cml": "CML",
        "mol": "MDL SDFile",
        "pdb": "PDB",
        "smiles": "SMILES Notation",
        "hin": "Hyperchem File"
      },
      "export": function (type) {
        var molecule = canvas.getMolecule().toJSON();
        $http.post('/api/conversion/export/' + type, molecule).success(function (data) {
          $download(data, storage.current + '.' + type);
        });
      },
      "import": function () {
        $http.post('/api/conversion/import', molecule).success(function (data) {
          var mol = Chem.Molecule.readJSON(data);
          moleculeDrawer.draw(mol);
        });
      }

    };

  });
