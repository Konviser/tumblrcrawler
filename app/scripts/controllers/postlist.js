'use strict';

angular.module('tumblrcrawlerApp')
  .controller('PostList', ['$scope', '$rootScope', 'blogData', function ($scope, $rootScope, blogData) {

    $scope.blogData = blogData;
    $scope.postList = blogData.data;

    $scope.showMore = function(){
      blogData.data.currentPage++;
      blogData.get();
    };

    $scope.noMore = function(){
      return blogData.data.totalItems === blogData.data.postData.length;
    };

}]);
