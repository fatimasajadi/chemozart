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
  })
  .run(function (notify) {
    notify.config({
      duration: 3000
    });
  });
