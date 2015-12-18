'use strict';

/* Controllers */

var homeApp = angular.module('HomeApp', []);

homeApp.controller('HomeCtrl',
        function ($scope) {
            $scope.user = {
                login: undefined,
                password: undefined,
                connect: function () {
                    
                }
            };
        });