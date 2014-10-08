'use strict';

angular.module('tumblrcrawlerApp')
  .controller('MainCtrl', ['$scope','$rootScope', 'blogData', function ($scope, $rootScope, blogData) {

    $scope.blogData = blogData;

    $scope.getData = function(){
      blogData.resetData();
      blogData.data.blogName = $scope.blogURL;
      blogData.get();
    };

  }]);
