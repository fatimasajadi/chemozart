'use strict';

angular.module('chemartApp')
  .controller('MenubarCtrl', function ($scope, $location) {
    $scope.print = function () {
      window.print();
    };
  });
