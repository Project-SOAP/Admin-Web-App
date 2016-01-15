'use strict';

/* Controllers */

var homeApp = angular.module('soaApp');

homeApp.controller('HomeCtrl', ['$scope', '$location', 'AuthServ', '$http',
    function ($scope, $loc, AuthServ, $http) {
        $scope.dash = {};
        $scope.user = {};
        $scope.spinnerLoading = false;
        $scope.connect = function () {
            $scope.spinnerLoading = true;
            var name = $scope.dash.name;
            var password = $scope.dash.password;
            var success = function (res) {
                if (res) {
                    window.sessionStorage['id'] = res.id;
                    window.sessionStorage['name'] = res.name;
                    window.sessionStorage['email'] = res.email;
                    window.sessionStorage['token'] = res.token;
                    $http.defaults.headers.common["authorization"] = res.token;
                    $scope.user = AuthServ.user;
                    $loc.path("/localize"); //redirection vers la bonne vue
                }
            };
            var error = function (err) {
                console.log(err);
                $scope.formulaire.$error.errorBack = true;
                $scope.spinnerLoading = false;
            };
            // Le .then permet d'attendre la "promesse" de l'asynchrone de connexion
            AuthServ.getConnexion(name, password).then(success, error);
        };

    }]);