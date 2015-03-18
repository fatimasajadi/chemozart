'use strict';

angular.module('chemartApp')
  .controller('MainCtrl', function ($scope, $http, moleculeDrawer, canvas) {

    $scope.canvas = canvas;
    $scope.modes = Mol3D.Mode;
    $scope.displays = Mol3D.Display;
    $scope.mode = function (mode) {
      canvas.setMode(mode);
    };

    canvas.show();

    var container = document.getElementById('canvas-container');

    angular.element(container).append(canvas.renderer.domElement);

    $scope.build = function () {
      var molecule = canvas.getMolecule();
      $http.post('/api/geometry/build', molecule.toJSON()).success(function (data) {
        var mol = Chem.Molecule.readJSON(data);
        moleculeDrawer(mol);
      });
    };

    $scope.addHydrogens = function () {
      var molecule = canvas.getMolecule();
      $http.post('/api/geometry/addhydrogens', molecule.toJSON()).success(function (data) {
        var mol = Chem.Molecule.readJSON(data);
        moleculeDrawer(mol);
      });
    };

    $scope.help = function () {
      angular.element(document.querySelector('help')).addClass('show');
    };

    $scope.about = function () {
      angular.element(document.querySelector('about')).addClass('show');
    };

  });
