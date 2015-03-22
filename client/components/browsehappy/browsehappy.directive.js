'use strict';

angular.module('chemartApp')
  .directive('browseHappy', function () {
    return {
      restrict: 'E',
      link: function (scope, elem) {
        scope.support = window.WebGLRenderingContext ? true : false;
      },
      templateUrl: 'components/browsehappy/browsehappy.html'
    }
  });
