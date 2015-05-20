'use strict';

angular.module('chemartApp')
  .controller('MainCtrl', function ($scope, energy, conversion, canvas, storage, builder, notify) {

    if (canvas === null) {
      return;
    }

    // Assign scope values
    $scope.canvas = canvas;
    $scope.energy = energy;
    $scope.storage = storage;
    $scope.builder = builder;
    $scope.conversion = conversion;
    $scope.modes = Mol3D.Mode;
    $scope.displays = Mol3D.Display;

    // Create a new file
    storage.new();

    // Set mode
    $scope.mode = function (mode) {
      canvas.setMode(mode);
    };

    // Start draw and redrawing
    canvas.show();

    var container = document.getElementById('canvas-container');
    angular.element(container).append(canvas.renderer.domElement);

    notify({
      message: 'Application started, Do the art !'
    });
  });
