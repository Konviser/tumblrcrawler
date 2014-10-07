'use strict';

/**
 * @ngdoc overview
 * @name tumblrcrawlerApp
 * @description
 * # tumblrcrawlerApp
 *
 * Main module of the application.
 */
angular
  .module('tumblrcrawlerApp', ['ui.bootstrap'])
  .run(['$rootScope', function($rootScope){
    $rootScope.currentPage = 0;

  }]);
