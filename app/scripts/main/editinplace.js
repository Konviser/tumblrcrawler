'use strict';

angular.module('main')
  .directive('editInPlace', function($compile,$filter,blogData){

    var dateTemplate = '<label>Date:</label><span data-ng-click="edit()" data-ng-bind="value.date | date: \'medium\'"></span>'+
                       '<input class="form-control" type="datetime-local" data-ng-model="value.date" ></input>'+
                       '<span class="help-block">click on the date to edit</span>';
    var titleTemplate ='<label>Title:</label><span data-ng-click="edit()" data-ng-bind="(value.title | nulltitle)"></span>'+
                       '<input class="form-control" type="text" data-ng-model="value.title" value="value.title"></input>'+
                       '<span class="help-block">click on the title to edit</span>';

    var imageTemplate = '<span class="add-image" data-ng-click="edit()"><i class="fa fa-plus-circle"></i>Add Image</span>'+
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

      scope.value.date = $filter("date")(scope.value.date, 'yyyy-MM-ddTHH:mm:ss');


    };

    return {
      restrict: 'E',
      replace: true,
      scope: {
          value: '='
      },
      link: link
    }
})
