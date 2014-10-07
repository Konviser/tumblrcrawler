'use strict';

angular.module('tumblrcrawlerApp')
  .directive('editInPlace', function($compile){

    var dateTemplate = '<span data-ng-click="edit()" ng-bind="value.timestamp | date:\'medium\'"></span>'+
                       '<input class="form-control" type="text" data-ng-model="value.timestamp" value="value.timestamp"></input>';
    var titleTemplate = '<span data-ng-click="edit()" ng-bind="value.title"></span>'+
                       '<input class="form-control" type="text" data-ng-model="value.title" value="value.title"></input>';

    var imageTemplate = '<span data-ng-click="edit()">Add Images</span>'+
                        '<input class="form-control" data-ng-keydown="addImages($event)" data-ng-model="image" type="text" placeholder="type image URL and press Enter"></input>';


    var getTemplate = function(type){
      var template = '';
      switch(type) {
        case 'date':
          template = dateTemplate;
          break;
        case 'title':
          template = titleTemplate;
          break;
        case 'img':
          template = imageTemplate;
          break;
      }
      return template;
    };

    var link = function(scope,element, attrs){
      element.html(getTemplate(attrs.type)).show();
      $compile(element.contents())(scope);

      var inputElement = angular.element(element.children()[1]);
      element.addClass('edit-in-place');
      scope.editing = false;

      scope.edit = function(){
        scope.editing = true;
        element.addClass('active');
        inputElement[0].focus();
      }

      scope.addImages = function($event){
        if ($event.keyCode === 13) {
          scope.value.imgs.push(scope.image);
          scope.editing = false;
          element.removeClass('active');
        }
      };

      inputElement.on('blur', function () {
        scope.editing = false;
        element.removeClass('active');
      });


    };

    return {
      restrict: 'E',
      scope: {
          value: '='
      },
      link: link
    }
})
