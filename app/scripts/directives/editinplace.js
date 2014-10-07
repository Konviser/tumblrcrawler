'use strict';

angular.module('tumblrcrawlerApp')
  .directive('editInPlace', function($compile){

    var dateTemplate = '<span data-ng-click="edit()" ng-bind="value | date:\'medium\'"></span>'+
                       '<input class="form-control" type="text" data-ng-model="value" value="value"></input>';
    var titleTemplate = '<span data-ng-click="edit()" ng-bind="value"></span>'+
                       '<input class="form-control" type="text" data-ng-model="value" value="value"></input>';

    var getTemplate = function(type){
      var template = '';
      switch(type) {
        case 'date':
          template = dateTemplate;
          break;
        case 'title':
          template = titleTemplate;
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

      inputElement.on('blur', function () {
        scope.editing = false;
        element.removeClass('active')
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
