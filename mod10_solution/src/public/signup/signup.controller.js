(function() {
    'use strict'; 

    angular.module('public').controller('SignUpController', SignUpController); 

    SignUpController.$inject = ['MenuService', 'UserService'];
    function SignUpController(MenuService, UserService) {
        var $ctrl = this; 
        $ctrl.user = {};
        $ctrl.invalidMenuItem = false; 
        $ctrl.saved = false; 

        $ctrl.checkMenuItem = function() {
            if($ctrl.user.favorite) {
                var menuItem = $ctrl.user.favorite.toUpperCase();
                MenuService.getMenuItem(menuItem).then(function(response) {
                    $ctrl.invalidMenuItem = !response;
                }).catch(function() {
                    $ctrl.invalidMenuItem = true;
                });
            }
        }; 

        $ctrl.submit = function() {            
            // Prevent the function from running if no favorite item
            if (!$ctrl.user.favorite) {
                console.log('No favorite item provided');
                return;
            }

            var menuItem = $ctrl.user.favorite.toUpperCase(); 
            
            MenuService.getMenuItem(menuItem).then(function(response) {
                if(response) {
                    $ctrl.user.favoriteItem = response;
                    UserService.saveUser($ctrl.user);
                    $ctrl.saved = true; 
                    $ctrl.invalidMenuItem = false; 
                } else {
                    $ctrl.invalidMenuItem = true;
                    $ctrl.saved = false; 
                }
            }).catch(function(error) {
                $ctrl.invalidMenuItem = true;
                $ctrl.saved = false;
            });
        };
    }
})();