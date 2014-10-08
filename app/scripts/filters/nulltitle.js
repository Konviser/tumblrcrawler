'use strict';

angular.module('tumblrcrawlerApp')
  .filter('nulltitle', ['$filter', function($filter){

      return function(title){
        if(typeof(title)==='undefined') {return  'no title';}
        else return title;
      }

  }])
  
  .filter('filterposts', ['$filter', function($filter){
    return function (posts,title) {
      if (posts.length) {

        var filteredposts = [];
        var titleMatch = new RegExp(title, 'i');

        for (var i = 0; i < posts.length; i++) {
          if (title === "") {
            filteredposts.push(posts[i]);
          } else if (title != "" && titleMatch.test(posts[i].title)) {
              filteredposts.push(posts[i]);
        }}
      }
    return filteredposts;
  }
}]);
