'use strict';

angular.module('tumblrcrawlerApp')
  .service('blogData', ['$http', 'apiKey', function($http,apiKey){

    var data = [];
    var retriveImages = function(data){
        if (data){
          for (var i=0; i<data.length; i++){
            data[i].imgs=new Array();
            if (data[i].type === 'photo'){
              for (var k=0;k<data[i].photos.length;k++){
                data[i].imgs.push(data[i].photos[k].original_size.url);
              }
            } else {
              var div = document.createElement('div');
              switch (data[i].type) {
                case 'link':
                  div.innerHTML = data[i].description;
                  break;
                case 'quote':
                  div.innerHTML = data[i].source;
                  break;
                case 'text':
                  div.innerHTML = data[i].body;
                  break;
              }
              var images = div.getElementsByTagName('img');
              if (images.length){
                for (var m=0; m<images.length;m++){
                  data[i].imgs.push(images[m].src);
                }
              }

            }
          }
        }
    };

    this.get = function(blogUrl){

      var apiUrl = 'http://api.tumblr.com/v2/blog/'+blogUrl+'/posts?api_key='+apiKey+'&callback=JSON_CALLBACK';

      $http.jsonp(apiUrl)
        .then(function (response) {
            retriveImages(response.data.response.posts);
            data = response.data.response;
        });
    };
    this.getPostData = function(){
      return data.posts;
    }
}]);
