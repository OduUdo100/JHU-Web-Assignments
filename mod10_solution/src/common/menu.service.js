(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function(shortName) {
    if(!shortName) return Promise.resolve(null);

    var category = shortName.charAt(0);
    var itemNumber = parseInt(shortName.substring(1)) - 1;

    if(isNaN(itemNumber) || itemNumber < 0) {
      return Promise.resolve(null);
    }

    var url = ApiPath + '/menu_items/' + category + '/menu_items/' + itemNumber +'.json'; 

    return $http.get(url).then(function(response) {
      if(response.data) {
        return {
          name: response.data.name,
          description: response.data.description,
          imageUrl: ApiPath + '/images/' + shortName + '.jpg'
        };
      }
      return null;
    }).catch(function(error) {
      return null;
    });
  };

}
})();
