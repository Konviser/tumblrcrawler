'use strict';

angular.module('tumblrcrawlerApp')
  .controller('MainCtrl', ['$scope','$rootScope', 'blogData', function ($scope, $rootScope, blogData) {

    $scope.blogData = blogData;

    $scope.getData = function(blogName){
      blogData.resetData();
      blogData.data.blogName = blogName;
      blogData.get();
    }

  }]);
