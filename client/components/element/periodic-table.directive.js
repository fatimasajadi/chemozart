'use strict';

angular.module('chemartApp')
  .directive('periodicTable', function (element, canvas) {
    return {
      restrict: 'E',
      scope: {},
      link: function (scope, elem, attr) {
        scope.canvas = canvas;

        scope.close = function () {
          elem.removeClass('show').addClass('hide');
          setTimeout(function () {
            elem.removeClass('hide');
          }, 1000);
        };

        scope.setElement = function (atomicNumber) {
          canvas.data.element = atomicNumber;

          scope.close();
        };

        scope.periodicTable = element.periodicTable;
      },
      templateUrl: 'components/element/periodic-table.html'
    }
  });
