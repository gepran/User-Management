'use strict';

angular.module('usersApp').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
        .state('/home', {
            url: '/',
            templateUrl: '../app/templates/home.ejs',
            controller: 'userController'
        })
        .state('usersList', {
            url: '/usersList',
            templateUrl: '../app/templates/usersList.ejs',
            controller: 'userListController'
        });
            
    }
]);