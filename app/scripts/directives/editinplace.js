'use strict';

angular.module('tumblrcrawlerApp')
  .directive('editInPlace', function($compile,$filter,blogData){

    var dateTemplate = '<p>Date (click to edit)</p><span data-ng-click="edit()" data-ng-bind="value.date | date "medium"></span>'+
                       '<input class="form-control" type="date" data-ng-model="value.date"></input>';
    var titleTemplate = '<p>Title (click to edit)</p><span data-ng-click="edit()" data-ng-bind="(value.title | nulltitle)"></span>'+
                       '<input class="form-control" type="text" data-ng-model="value.title" value="value.title"></input>';

    var imageTemplate = '<span data-ng-click="edit()">Add Images</span>'+
                        '<input class="form-control" type="url" data-ng-keydown="addImages($event)" data-ng-model="image" type="text" placeholder="type image URL and press Enter"></input>';


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

      if (attrs.type === 'img') {
        var inputElement = angular.element(element.children()[1]);
      } else {
        var inputElement = angular.element(element.children()[2]);
      }

      element.addClass('edit-in-place');
      scope.editing = false;

      scope.edit = function(){
        scope.editing = true;
        element.addClass('active');
        inputElement[0].focus();
      }

      scope.addImages = function($event){
        if ($event.keyCode === 13 && scope.image) {
          //scope.value.imgs.push(scope.image);
          blogData.addImage(scope.image,scope.value.id);
          scope.editing = false;
          element.removeClass('active');
        }
      };

      inputElement.on('blur', function () {
        scope.editing = false;
        element.removeClass('active');
      });

      scope.value.date = $filter("date")(scope.value.date, 'yyyy-MM-dd');


    };

    return {
      restrict: 'E',
      scope: {
          value: '='
      },
      link: link
    }
})
