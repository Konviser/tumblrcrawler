'use strict';

angular.module('tumblrcrawlerApp')
  .controller('MainCtrl', ['blogData', function ($scope, blogData) {

    $scope.getData = blogData.getBlogData;

  }]);
