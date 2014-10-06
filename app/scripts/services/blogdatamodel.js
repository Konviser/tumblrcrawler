'use strict';

angular.module('tumblrcrawlerApp')
  .factory('blogData', ['$http', 'apiKey', function($http,apiKey){

    var data = [];

    var getBlogData = function(blogUrl){

      var apiUrl = 'http://api.tumblr.com/api/v2/blog/'+blogUrl+'/posts?api_key='+apiKey;

      $http.get(apiUrl)
        .then(function (response) {
            console.log(response);
            this.data = response;
        });
    };

    return {
      data: data,
      get: getBlogData
    };
}]);
