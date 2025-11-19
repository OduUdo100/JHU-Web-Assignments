(function() {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        
        // Initialize controller properties
        ctrl.searchTerm = '';      
        ctrl.found = [];
        ctrl.error = ''; 
        
        // Main function to narrow down menu items
        ctrl.narrowItDown = function() {
            // Reset previous results and error
            ctrl.found = [];
            ctrl.error = '';
            
            // Check if search term is empty - display "Nothing found"
            if (!ctrl.searchTerm.trim()) {
                ctrl.error = 'Nothing found';
                return;
            }
            
            // Call service to get matched menu items
            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
                .then(function(foundItems) {
                    ctrl.found = foundItems;
                    
                    // Check if no items were found - display "Nothing found"
                    if (foundItems.length === 0) {
                        ctrl.error = 'Nothing found';
                    }
                })
                .catch(function(error) {
                    // Handle errors from the service
                    ctrl.error = 'Error searching menu items';
                });
        };
        
        // Function to remove an item from the found list
        ctrl.removeItem = function(index) {
            ctrl.found.splice(index, 1);
        };
    }
    
    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;
        
        // Main service method to get matched menu items
        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: 'GET',
                url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
            }).then(function(response) {
                return processResponse(response.data, searchTerm);
            });
        };
        
        // Helper function to process API response and filter items
        function processResponse(data, searchTerm) {
            var foundItems = [];
            var searchTermLower = searchTerm.toLowerCase();
            
            // Loop through all menu categories
            for (var category in data) {
                if (data.hasOwnProperty(category)) {
                    var menuItems = data[category].menu_items;
                    
                    // Loop through each item in the category
                    for (const element of menuItems) {
                        var item = element;
                        
                        // Check if description contains search term (case insensitive)
                        if (item.description.toLowerCase().indexOf(searchTermLower) !== -1) {
                            foundItems.push(item);
                        }
                    }
                }
            }
            
            return foundItems;
        }
    }
    
    // Found Items Directive definition
    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html', 
            scope: {
                items: '<',           
                onRemove: '&'         
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        
        return ddo;
    }
    
    function FoundItemsDirectiveController() {
        var list = this;
        
        list.isEmpty = function() {
            return !list.items || list.items.length === 0;
        };
        
        list.remove = function(index) {
            list.onRemove({ index: index });
        };
    }
    
})();