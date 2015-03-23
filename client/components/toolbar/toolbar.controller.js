'use strict';

angular.module('chemartApp')
  .controller('ToolbarCtrl', function ($scope, hotkeys, canvas) {

    hotkeys.add({
      combo: 'v',
      description: 'Positioning the camera',
      callback: function(event) {
        event.preventDefault();
        canvas.setMode(Mol3D.Mode.Orbit);
      }
    });

    hotkeys.add({
      combo: 'e',
      description: 'Editing the molecule',
      callback: function(event) {
        event.preventDefault();
        canvas.setMode(Mol3D.Mode.Editor);
      }
    });

    $scope.selectElement = function () {
      angular.element(document.querySelector('choose-element')).addClass('show');
    };

  });
