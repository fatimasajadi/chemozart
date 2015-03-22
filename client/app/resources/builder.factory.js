'use strict';

angular.module('chemartApp')
  .factory('builder', function ($http, moleculeDrawer, canvas) {

    return {

      build3d: function () {
        var molecule = canvas.getMolecule().toJSON();
        $http.post('/api/build/3d', molecule).success(function (data) {
          var mol = Chem.Molecule.readJSON(data);
          moleculeDrawer(mol);
        });
      },
      addHydrogens: function () {
        var molecule = canvas.getMolecule().toJSON();
        $http.post('/api/build/addhydrogens', molecule).success(function (data) {
          var mol = Chem.Molecule.readJSON(data);
          moleculeDrawer(mol);
        });
      }

    };

  });
