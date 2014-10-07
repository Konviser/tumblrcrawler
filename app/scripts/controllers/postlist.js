'use strict';

angular.module('tumblrcrawlerApp')
  .controller('PostList', ['$scope', '$rootScope', 'blogData', function ($scope, $rootScope, blogData) {

    $scope.blogData = blogData;
    $scope.postList = blogData.data;
    
  }]);
