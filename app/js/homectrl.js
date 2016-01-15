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
            console.log("Enter $scope.connect");
            var name = $scope.dash.name;
            var password = $scope.dash.password;
            var success = function (res) {
                if (res) {
                    console.log("Enter success res OK");
                    window.sessionStorage['id'] = res.id;
                    window.sessionStorage['name'] = res.name;
                    window.sessionStorage['email'] = res.email;
                    console.log("res.token : " + res.token);
                    window.sessionStorage['token'] = res.token;

                    console.log(res);
                    $http.defaults.headers.common["authorization"] = res.token;
                    $scope.user = AuthServ.user;
                    $loc.path("/localize"); //redirection vers la bonne vue
                }
            };
            var error = function (err) {
                console.log("Enter error");
                console.log(err);
                $scope.formulaire.$error.errorBack = true;
                $scope.spinnerLoading = false;
            };
            // Le .then permet d'attendre la "promesse" de l'asynchrone de connexion
            AuthServ.getConnexion(name, password).then(success, error);
        };

    }]);