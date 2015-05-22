'use strict';

angular.module('chemartApp')
  .factory('conversion', function ($http, moleculeDrawer, canvas, $download, storage, notify) {

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
      "import": function (file) {
        function getExtension(filename) {
          return filename.substr(filename.lastIndexOf('.') + 1)
        }
        var type = getExtension(file.name);

        if(['cml', 'hin', 'mol', 'mol2', 'smiles', 'pdb'].indexOf(type) === -1) {
          return notify({
            message: 'The file selected is not supported.',
            classes: ['error']
          });
        }

        var fr = new FileReader();
        fr.readAsBinaryString(file);

        fr.onload = function (e) {
          var data = e.target.result;
          $http.post('/api/conversion/import/' + type, {
            data: data
          }).success(function (data) {
            var mol = Chem.Molecule.readJSON(data);
            moleculeDrawer.draw(mol);

            notify({
              message: 'The file "' + file.name + '" has been imported',
              classes: ['success']
            });
          });
        };
      }

    };

  });
