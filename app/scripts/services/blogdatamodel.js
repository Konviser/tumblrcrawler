'use strict';

angular.module('tumblrcrawlerApp')
  .service('blogData', ['$http', 'apiKey', function($http,apiKey){
    
    this.data = [];
    this.get = function(blogUrl){
    var that = this;
      var apiUrl = 'http://api.tumblr.com/v2/blog/'+blogUrl+'/posts?api_key='+apiKey+'&callback=JSON_CALLBACK';

      $http.jsonp(apiUrl)
        .then(function (response) {
            that.data = response.data.response;
        });
    };
}]);
