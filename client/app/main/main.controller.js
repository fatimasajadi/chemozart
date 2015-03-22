'use strict';

angular.module('chemartApp')
  .controller('MainCtrl', function ($scope, $http, $download, moleculeDrawer, canvas, storage, builder) {

    if (canvas === null) {
      return;
    }

    // Assign scope values
    $scope.canvas = canvas;
    $scope.storage = storage;
    $scope.builder = builder;
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

  });
