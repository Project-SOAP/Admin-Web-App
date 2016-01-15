'use strict';

/* App Module */

var SOAApp = angular.module('soaApp', [
    'ngRoute'
]);

SOAApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/home', {
                    templateUrl: 'partials/home.html',
                    controller: 'HomeCtrl'
                }).
                when('/localize', {
                    templateUrl: 'partials/localize.html',
                    controller: 'LocalizeCtrl'
                }).
                otherwise({
                    redirectTo: '/home'
                });
    }]);
