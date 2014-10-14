'use strict';

angular.module('main')
  .factory('blogData', ['$http', 'apiKey', function($http,apiKey){

    var data = {
      postData:[],
      totalItems:0,
      blogName:'',
      currentPage:0,
      errorFetching:false
    };

    var limit = 5;
    var offset = 0;

    var retriveImages = function(data){
        if (data){
          for (var i=0; i<data.length; i++){
            data[i].date = new Date(data[i].date);
            data[i].imgs=new Array();
            if (data[i].type === 'photo'){
              for (var k=0;k<data[i].photos.length;k++){
                data[i].imgs.push({
                  id: i,
                  src: data[i].photos[k].original_size.url
                });
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
                  data[i].imgs.push({
                    id: m,
                    src: images[m].src
                  });
                }
              }
            }
          }
        }
    };

    var resetError = function(){
      data.errorFetching = false;
    };

    var get = function(){

      resetError();

      offset = this.data.currentPage*limit;
      var apiUrl = 'http://api.tumblr.com/v2/blog/'+this.data.blogName+'/posts?api_key='+apiKey+'&offset='+offset+'&limit='+limit+'&callback=JSON_CALLBACK';
      var that = this;
      $http.jsonp(apiUrl)
        .then(function (response) {
            if(!that.data.totalItems)
              that.data.totalItems = response.data.response.total_posts;
            retriveImages(response.data.response.posts);
            that.data.postData = that.data.postData.concat(response.data.response.posts);
        }, function(error){
            console.log('Error has occured while fetching the data');
            that.data.errorFetching = true;
        });
    };

    var resetData = function(){
      this.data.postData =[];
      this.data.totalItems = 0;
      this.data.blogName = '';
      this.data.currentPage = 0;
    };

    var deleteImage = function(index,post){
      var postIndex = this.data.postData.indexOf(post);
      this.data.postData[postIndex].imgs.splice(index,1);
    };

    var addImage = function(imgUrl,postId){
      var postIndex = findPost(postId);
      var newImageIndex = this.data.postData[postIndex].imgs.length;
      this.data.postData[postIndex].imgs.push({
        id:newImageIndex,
        src:imgUrl
      });
    };


    return {
      data:data,
      get:get,
      resetData:resetData,
      deleteImage:deleteImage,
      addImage:addImage
    }
}]);
