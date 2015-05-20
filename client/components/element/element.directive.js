'use strict';

angular.module('chemartApp')
  .directive('chooseElement', function (canvas) {
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

        scope.quick = [
          Chem.Element.findByAtomicNumber(1),
          Chem.Element.findByAtomicNumber(6),
          Chem.Element.findByAtomicNumber(7),
          Chem.Element.findByAtomicNumber(8),
          Chem.Element.findByAtomicNumber(16)
        ];

        scope.showTable = function () {
          scope.close();
          angular.element(document.querySelector('periodic-table')).addClass('show');
        };
      },
      templateUrl: 'components/element/element.html'
    }
  });
