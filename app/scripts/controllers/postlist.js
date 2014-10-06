'use strict';

angular.module('tumblrcrawlerApp')
  .controller('PostList', ['$scope', 'blogData', function ($scope, blogData) {

    $scope.postList = blogData.data;
    //$scope.editPost = blogData.editEntry;

  }]);
