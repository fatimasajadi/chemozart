'use strict';

angular.module('chemartApp')
  .directive('help', function (hotkeys) {

    return {
      restrict: 'E',
      link: function (scope, elem) {
        hotkeys.add({
          combo: 'f1',
          description: 'Help',
          callback: function(event) {
            event.preventDefault();
            scope.help();
          }
        });

        scope.help = function () {
          elem.addClass('show');
        };

        elem.on('click', function () {
          elem.removeClass('show').addClass('hide');
          setTimeout(function () {
            elem.removeClass('hide');
          }, 1000);
        });
      },
      templateUrl: 'components/help/help.html'
    }
  });
