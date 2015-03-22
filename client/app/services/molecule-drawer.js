'use strict';

angular.module('chemartApp')
  .factory('moleculeDrawer', function (centerAtoms, canvas) {
    return function (molecule) {
      var currentMolecule = canvas.getMolecule();
      var time = 400;

      centerAtoms(molecule);

      for (var i in molecule.atoms) {
        if (typeof currentMolecule.atoms[i] !== 'undefined') {
          new TWEEN.Tween(currentMolecule.atoms[i].position)
            .to(molecule.atoms[i].position, time)
            .easing(TWEEN.Easing.Circular.Out)
            .start();
        }
      }

      var endTime = Date.now() + time;

      function animate() {
        if (Date.now() < endTime) {
          requestAnimationFrame(animate);
        }

        TWEEN.update();
        canvas.update();
      }

      requestAnimationFrame(animate);

      setTimeout(function () {
        canvas.clear();
        canvas.attach(molecule);
      }, time);
    };
  });
