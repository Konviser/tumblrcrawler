'use strict';

angular.module('tumblrcrawlerApp')
  .controller('PostList', ['$scope', '$rootScope', 'blogData', function ($scope, $rootScope, blogData) {

    $scope.blogData = blogData;
    $scope.postList = blogData.data;
    $scope.currentPage = $rootScope.currentPage;

    $scope.pageChanged = function(page){

      console.log($rootScope.blogURL);
    };


  }]);
