'use strict';

angular.module('tumblrcrawlerApp')
  .controller('PostList', ['$scope', 'blogData', function ($scope, blogData) {

    $scope.postList = [];
    $scope.editPost = blogData.editEntry;

    $scope.$watch(function(){
      return blogData.getPostData();
    }, function(newVal){
      if (newVal != undefined)
        console.log(newVal);
        $scope.postList = newVal;
    });

  }]);
