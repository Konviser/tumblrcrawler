'use strict';

angular.module('infomsg',[])
  .directive('infoMessage', ['infoMsg',function(infoMsg){

    return {
      restrict: 'A',
      template: function(elem, attr){

        return '<div class="msg {{msg.props.messageStatus}}" ng-class="{hidden:!msg.props.messageShow}">'+
                  '<a class="close ng-binding" ng-click="msg.hideMsg()">x</a>'+
                  '<span ng-bind="msg.props.infoMessage" class="infomsg"></span>'+
              '</div>';
      },

      link: function(scope,elem, attrs){
        scope.msg = infoMsg;
      }
    }

  }])

  .factory('infoMsg', function() {

    var props = {
      messageShow: false,
      infoMessage: '',
      messageStatus: '',
    };

    var setMessage = function(message){
      this.props.infoMessage = message;
      this.props.messageShow = true;
    };

    var showMsgError = function(message) {
      setMessage.call(this,message);
      this.props.messageStatus = 'msg-error';

    };

    var showMsgSuccess = function(message) {
      setMessage.call(this,message);
      this.messageStatus = 'msg-success';
    };

    var hideMsg = function(){
      this.props.messageShow = false;
    };

    return {
      props: props,
      showError: showMsgError,
      hideMsg:hideMsg,
      showSuccess: showMsgSuccess
    }

  });
