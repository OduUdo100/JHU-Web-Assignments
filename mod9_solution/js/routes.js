(function() {
    'use strict';
    
    angular.module('MenuApp').config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        
        // Redirect to home if no other URL matches
        $urlRouterProvider.otherwise('/');
        
        // Set up UI states
        $stateProvider
        
        // Home state
        .state('home', {
            url: '/',
            templateUrl: 'js/templates/home.template.html'
        })
        
        // Categories state
        .state('categories', {
            url: '/categories',
            templateUrl: 'js/templates/categories-state.template.html',
            controller: 'CategoriesStateController as categoriesState',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        
        // Items state
        .state('items', {
            url: '/items/{categoryShortName}',
            templateUrl: 'js/templates/items-state.template.html',
            controller: 'ItemsStateController as itemsState',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
            }
        });
    }
    
    // Categories State Controller
    angular.module('MenuApp').controller('CategoriesStateController', CategoriesStateController);
    
    CategoriesStateController.$inject = ['categories'];
    function CategoriesStateController(categories) {
        var categoriesState = this;
        console.log('Categories loaded:', categories); // Debug log
        categoriesState.categories = categories;
    }
    
    // Items State Controller
    angular.module('MenuApp').controller('ItemsStateController', ItemsStateController);
    
    ItemsStateController.$inject = ['items'];
    function ItemsStateController(items) {
        var itemsState = this;
        console.log('Items loaded:', items);
        itemsState.items = items;
    }
})();