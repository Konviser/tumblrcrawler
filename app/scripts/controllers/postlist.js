'use strict';

angular.module('tumblrcrawlerApp')
  .controller('PostList', ['$scope', 'blogData', 'infoMsg', function ($scope, blogData, infoMsg) {

    $scope.blogData = blogData;
    $scope.postList = blogData.data;

    $scope.$watch('blogData.data.errorFetching', function(newVal){

      infoMsg.hideMsg();

      if(newVal){
          infoMsg.showError('Hmm..an error has been returned from the server. May be try another blog?');
      }

    });

    $scope.showMore = function(){
      blogData.data.currentPage++;
      blogData.get();
    };

    $scope.noMore = function(){
      return blogData.data.totalItems === blogData.data.postData.length;
    };

}]);
