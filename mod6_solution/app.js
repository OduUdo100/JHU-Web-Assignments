(function() {
    'use strict'; 

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope']; 

    function LunchCheckController($scope) {
        $scope.lunchItems = ''; 
        $scope.message = ''; 
        $scope.fontColor = ''; 
        $scope.borderColor = '';
        $scope.messageType = ''; 

        $scope.checkLunch = function () {
            if(!$scope.lunchItems || $scope.lunchItems.trim().length === 0) {
                $scope.message = 'Please enter data first'; 
                $scope.fontColor = '#e74c3c';
                $scope.borderColor = '#e74c3c';
                $scope.messageType = 'invalid';
                return;
            }

            var items = $scope.lunchItems.split(',')
                .map(function(item) {
                    return item.trim(); 
                })
                .filter(function(item) {
                    return item.length > 0; 
                }); 

            if(items.length <= 3) {
                $scope.message = 'Enjoy!'; 
                $scope.fontColor = '#27ae60';
                $scope.borderColor = '#27ae60';
                $scope.messageType = 'valid'; 
            } else {
                $scope.message = ' Too much!'; 
                $scope.fontColor = '#27ae60';
                $scope.borderColor = '#27ae60'; 
                $scope.messageType = 'valid'; 
            }
        };
    }
}) (); 