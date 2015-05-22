'use strict';

angular.module('chemartApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'cfp.hotkeys',
  'lr.upload',
  'cgNotify',
  'ngFileUpload'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .run(function (notify) {
    notify.config({
      duration: 3000
    });
  });
