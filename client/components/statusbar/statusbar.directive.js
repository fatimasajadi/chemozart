'use strict';

angular.module('chemartApp')
  .directive('statusbar', function (hotkeys, canvas) {

    return {
      restrict: 'E',
      link: function (scope, elem) {
        scope.canvas = canvas;
        scope.atoms = canvas.atoms;
      },
      templateUrl: 'components/statusbar/statusbar.html'
    }
  });
