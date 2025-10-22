(function () {
    'use strict'; 

    angular.module('ShoppingListCheckOff', [])
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .filter('customDollar', CustomDollarFilter);


    //data sharing 
    ShoppingListCheckOffService.$inject = []; 
    function ShoppingListCheckOffService() {
        var service = this; 

        var toBuyItems = [
            {name: "cookies", quantity: 10, pricePerItem: 1.50}, 
            {name: "chips", quantity: 4, pricePerItem: 3.99},
            {name: "bread", quantity: 3, pricePerItem: 5.99},
            {name: "chicken wings", quantity: 30, pricePerItem: 1.40},
            {name: "eggs", quantity: 12, pricePerItem: 1.00},
            {name: "bananas", quantity: 7, pricePerItem: 0.75},
        ]; 

        var boughtItems = []; 

        service.getToBuyItems = function() {
            return toBuyItems;
        }; 

        service.getBoughtItems= function() {
            return boughtItems; 
        };

        service.buyItem = function(itemIndex) {
            if(itemIndex >= 0 && itemIndex < toBuyItems.length) {
                var item = angular.copy(toBuyItems[itemIndex]); 

                item.totalPrice = item.quantity * item.pricePerItem; 

                toBuyItems.splice(itemIndex, 1); 
                boughtItems.push(item); 
            }
        }; 
    }

    //To buy controller
    ToBuyController.$inject = ['ShoppingListCheckOffService']; 
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this; 

        toBuy.items = ShoppingListCheckOffService.getToBuyItems();
        
        toBuy.buyItem = function(itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex); 
        };
    }

    //Already bought controlller
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this; 

        bought.items = ShoppingListCheckOffService.getBoughtItems(); 
    }

    function CustomDollarFilter() {
        return function(input) {
            if(isNaN(input)){
                return input; 
            }
            var priceFormat = parseFloat(input).toFixed(2); 
            return "$$$" + priceFormat; 
        };
    }
})();