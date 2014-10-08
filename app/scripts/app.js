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
  .module('tumblrcrawlerApp',['filters', 'infomsg'])
  .config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('httpResponseInterceptor');
  }]);
