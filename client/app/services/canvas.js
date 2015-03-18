'use strict';

angular.module('chemartApp')
  .factory('canvas', function () {
    if(window.WebGLRenderingContext) {
      var canvas = new Mol3D.Canvas();
      canvas.setDisplay(Mol3D.Display.BallAndStick);
      canvas.setMode(Mol3D.Mode.Editor);

      angular.element(window).on('resize', function () {

        canvas.camera.aspect = window.innerWidth / window.innerHeight;
        canvas.camera.updateProjectionMatrix();

        canvas.renderer.setSize(this.innerWidth, this.innerHeight);

      });

      return canvas;
    } else {
      document.getElementById('browsehappy').style.display = 'block';
    }
  });
