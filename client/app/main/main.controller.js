'use strict';

angular.module('chemartApp')
  .controller('MainCtrl', function ($scope) {
    var canvas = new Mol3D.Canvas();

    $scope.canvas = canvas;
    $scope.modes = Mol3D.Mode;
    $scope.displays = Mol3D.Display;
    $scope.mode = function (mode) {
      canvas.setMode(mode);
    };

    canvas.show();

    canvas.setDisplay($scope.displays.BallAndStick);
    canvas.setMode($scope.modes.Editor);

    var container = document.getElementById('canvas-container');

    angular.element(container).append(canvas.renderer.domElement);

    angular.element(window).on('resize', function () {

      canvas.camera.aspect = window.innerWidth / window.innerHeight;
      canvas.camera.updateProjectionMatrix();

      canvas.renderer.setSize(this.innerWidth, this.innerHeight);

    });

  });
