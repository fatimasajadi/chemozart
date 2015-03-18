'use strict';

angular.module('chemartApp')
  .controller('ToolbarCtrl', function ($scope, $location) {

    $scope.selectElement = function () {
      angular.element(document.querySelector('choose-element')).addClass('show');
    };

  });
