'use strict';

angular.module('main')
  .factory('httpResponseInterceptor', ['$q', function($q){

  //This is going to be used as a response
  //interceptor to intercept 404 status from tumblr
  var httpInterceptor = {

    response: function(response){
      if (response.config.url.match(/api.tumblr/) && response.data.meta.status === 404){
        return $q.reject(response);
      }
      return response || $q.when(response);
    }
  };

  return httpInterceptor;

}]);
