'use strict';

angular.module('chemartApp')
  .factory('centerAtoms', function () {
    return function (molecule) {
      var avg = new THREE.Vector3();
      var atomsCount = molecule.atoms.length;

      var i, position;

      for (i = molecule.atoms.length; i--;) {
        position = molecule.atoms[i].position;

        avg.x += position.x;
        avg.y += position.y;
        avg.z += position.z;
      }

      avg.x /= atomsCount;
      avg.y /= atomsCount;
      avg.z /= atomsCount;

      for (i = molecule.atoms.length; i--;) {
        position = molecule.atoms[i].position;

        position.x -= avg.x;
        position.y -= avg.y;
        position.z -= avg.z;
      }
    };
  });
