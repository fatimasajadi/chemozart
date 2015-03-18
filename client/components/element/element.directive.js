'use strict';

angular.module('chemartApp')
  .directive('chooseElement', function () {
    return {
      restrict: 'E',
      link: function (scope, elem, attr) {

        scope.close = function () {
          elem.removeClass('show').addClass('hide');
          setTimeout(function () {
            elem.removeClass('hide');
          }, 1000);
        };

        scope.setElement = function (atomicNumber) {
          scope.canvas.data.element = atomicNumber;
        };

        scope.quick = [
          Chem.Element.findByAtomicNumber(1),
          Chem.Element.findByAtomicNumber(6),
          Chem.Element.findByAtomicNumber(7),
          Chem.Element.findByAtomicNumber(8),
          Chem.Element.findByAtomicNumber(16)
        ];
      },
      templateUrl: 'components/element/element.html'
    }
  });
