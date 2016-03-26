'use strict';

angular.module('chemartApp')
  .factory('energy', function ($http, canvas, notify, moleculeDrawer, status) {

    return {

      getEnergy: function (forcefield) {
        var mol = JSONToOB(canvas.getMolecule());
        var forceField = new OpenBabel.OBForceField.FindForceField(forcefield);
        try {
          forceField.SetLogLevel(3);
          if (forceField.Setup(mol)) {
            var sUnit = forceField.GetUnit();
            var energy = forceField.Energy(true);
            notify({
              message: "The energy is " + energy,
              classes: ["success"],
            });

            status("E = " + energy + " " + sUnit);
          }
        } finally {
          mol.delete();
        }
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
