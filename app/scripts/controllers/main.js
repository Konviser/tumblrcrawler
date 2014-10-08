'use strict';

angular.module('tumblrcrawlerApp')
  .controller('MainCtrl', ['$scope', 'blogData', function ($scope, blogData) {

    $scope.blogData = blogData;

    $scope.getData = function(){
      blogData.resetData();
      blogData.data.blogName = $scope.blogURL;
      blogData.get();
    };

  }]);
