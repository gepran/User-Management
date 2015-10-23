angular.module('usersApp').controller('userListController', ['$scope', '$http', '$mdDialog', '$state', function userListController($scope, $http, $mdDialog, $state) {
	
    $scope.getUsersList = function(){

        $http({
            url: '/userlist',
            method: 'GET'
        }).success(function(data){
            $scope.usersList = data; 
        }).error(function(data, status, headers, config) {
            alert("Users List Load Error");
        });
    }

    $scope.getUsersList();

/*=============== Create New User ===================== */

    $scope.newUser = {};
    $scope.newUser.createdate = new Date().toLocaleString();

    $scope.addUser = function(){

        $http({
            url: '/adduser',
            method: 'POST',
            data: $scope.newUser
        }).success(function(data){
            $state.go($state.current, {}, {reload: true});
            $mdDialog.cancel();
        }).error(function(data, status, headers, config) {
            alert("User Dont saved");
        });
    }

/*=============== New User Popup ===================== */

    $scope.status = '  ';

    $scope.showNewUserPopup = function(ev) {
        $mdDialog.show({
          controller: userListController,
          templateUrl: '../app/templates/newUserPopup.ejs',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
        .then(function() {
            $scope.status = 'You Added User.';
        }, function() {
            $scope.status = 'You cancelled.';
        });
    };

/*=================== Delete User =======================*/

    $scope.deleteUser = function(id) {

        $http({
            url: '/deleteUser/' + id,
            method: 'GET',
        }).success(function(data){
            $state.go($state.current, {}, {reload: true});
        }).error(function(data, status, headers, config) {
            alert("User Not Deleted");
        });

    }
/*=================== User Delete Confirmation Popup =======================*/

    $scope.showConfirm = function(ev) {
        $scope.userId = ev;
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title('Are you sure you want to delete user?')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Delete User')
              .cancel('Cancel');

        $mdDialog.show(confirm).then(function(tt) {
            $scope.deleteUser($scope.userId);
        }, function() {
          $scope.status = 'You decided to keep your debt.';
        });
    };

/*=================== User Details Popup =======================*/

    $scope.status = '';

    $scope.showUserDetailsPopup = function(userId) {

        $mdDialog.show({
            locals: { data: userId },
            controller: 'userDetailsController',
            templateUrl: '../app/templates/userDetailsPopup.ejs',
            parent: angular.element(document.body),
            targetEvent: userId,
            clickOutsideToClose:true
        })
        .then(function() {
            $scope.status = 'You Added User.';
        }, function() {
            $scope.status = 'You cancelled.';
        });
    };

/*=================== Update User Details =======================*/

    $scope.editUserDetails = function(obj){

        var userUpdateId = obj._id;

        $scope.usUp = {};
        $scope.usUp.firstname = obj.firstName;
        $scope.usUp.lastname = obj.lastName;
        $scope.usUp.mobile = obj.mobile;
        $scope.usUp.userage = obj.userAge;
        $scope.usUp.useremail = obj.userEmail;
        $scope.usUp.birthdate = obj.birthDate;

        $http({
            url: '/updateuser/' + userUpdateId,
            method: 'POST',
            data: $scope.usUp
        }).success(function(data){
            $scope.cancel();
        }).error(function(data, status, headers, config) {
            alert("User Not Updated");
        });
    }

/*====================== Inline Edit Start =================================*/

    $scope.selected = {};

    // gets the template to ng-include for a table row / item
    $scope.getTemplate = function (user) {
        if (user._id === $scope.selected._id) return 'edit';
        else return 'display';
    };

    $scope.editContact = function (user) {
        $scope.selected = angular.copy(user);
    };

    $scope.saveContact = function (idx) {
        $scope.usersList[idx] = angular.copy($scope.selected);
        $scope.editUserDetails($scope.usersList[idx]);
        $scope.reset();
    };

    $scope.reset = function () {
        $scope.selected = {};
    };

/*============== Popup Actions ======================== */

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

}]);