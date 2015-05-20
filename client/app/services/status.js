'use strict';

angular.module('chemartApp')
  .factory('status', function ($rootScope) {
    return function (status) {
      $rootScope.status = status;
    };
  });
