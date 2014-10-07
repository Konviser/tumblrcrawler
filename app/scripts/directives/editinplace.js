'use strict';

angular.module('tumblrcrawlerApp')
  .directive('editInPlace', function($compile){

    var dateTemplate = '<span class="edit" data-ng-hide="editing" data-ng-click="edit()" ng-bind="value | date:\'medium\'"></span>'+
                       '<input data-ng-show="editing" class="form-control" type="text" data-ng-model="value" value="value">';

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

      scope.edit = function(){
        scope.editing = true;
        inputElement[0].focus();
      }

      inputElement.prop('onblur', function () {
        scope.editing = false;
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
