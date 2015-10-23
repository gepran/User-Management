angular.module('usersApp').controller('userDetailsController', function userDetailsController($scope, $http, $mdDialog, $state, data) {
    
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;

    $scope.getUserDetails = function(){

        $http({
            url: '/getUserById/' + data,
            method: 'GET'
        }).success(function(data){
            $scope.usersDetails = data; 
        }).error(function(data, status, headers, config) {
            console.log("User Details Load Error");
        });

    }

    $scope.getUserDetails();

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
});
