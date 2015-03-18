'use strict';

angular.module('chemartApp')
  .factory('canvas', function () {
    var canvas = new Mol3D.Canvas();
    canvas.setDisplay(Mol3D.Display.BallAndStick);
    canvas.setMode(Mol3D.Mode.Editor);

    return canvas;
  });
