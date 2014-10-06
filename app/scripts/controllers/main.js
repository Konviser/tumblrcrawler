'use strict';

angular.module('tumblrcrawlerApp')
  .controller('MainCtrl', ['$scope', 'blogData', function ($scope, blogData) {

    $scope.getData = blogData.get;

  }]);
