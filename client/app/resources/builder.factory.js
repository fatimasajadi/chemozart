'use strict';

angular.module('chemartApp')
  .factory('builder', function ($http, moleculeDrawer, canvas, notify) {

    return {

      build3d: function () {
        var molecule = canvas.getMolecule().toJSON();
        $http.post('/api/build/3d', molecule).success(function (data) {
          var mol = Chem.Molecule.readJSON(data);
          moleculeDrawer.animate(mol);

          notify({
            message: '3D coordinates are created',
            classes: ['success']
          });
        });
      },
      addHydrogens: function () {
        var molecule = canvas.getMolecule().toJSON();
        $http.post('/api/build/addhydrogens', molecule).success(function (data) {
          var mol = Chem.Molecule.readJSON(data);
          moleculeDrawer.animate(mol);

          notify({
            message: 'Hydrogens are added and 3D coordinates are also created',
            classes: ['success']
          });
        });
      }

    };

  });
