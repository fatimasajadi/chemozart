'use strict';

angular.module('chemartApp')
  .factory('energy', function ($http, canvas, notify, moleculeDrawer, status) {

    return {

      getEnergy: function (forcefield) {
        var molecule = canvas.getMolecule().toJSON();
        $http.post('/api/energy/' + forcefield, molecule).success(function (data) {
          notify({
            message: 'The energy is ' + data.energy,
            classes: ['success']
          });

          status('E = ' + data.energy + ' kcal')
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
