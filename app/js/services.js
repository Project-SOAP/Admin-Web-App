'use strict';
/* Services */

var soaServices = angular.module('soaApp');
soaServices.service('AuthServ', function ($http, $q) {

    this.user;
    this.logged = false;
    this.getConnexion = function (name, password) {
        var defer = $q.defer(); // permet de récupérer la réponse déférée
        $http.post("http://212.227.108.163:20300/api/login/Admin", {"name": name, "password": password})
                .success((function (srv) {                              // Deuxième couche on passe le service en paramètre
                    return function (data) {                          // Troisième couche, il est alors possible que les couche communique entre elles

                        srv.user = data; // Pour récupérer les variables du service, il faut le passer en paramètre sur plusieurs couches.
                        srv.logged = true; // sinon, pour lui, le this est celui de la requête post envoyée à l'API
                        return defer.resolve(data);
                    };
                })(this))                                             // Première couche, on dit que le service passe en paramètre
                .error(function (data) {

                    console.error(data);
                    return defer.reject(data);
                });
        return defer.promise; // envoie d'une promesse d'envoi de réponse
    };
});
soaServices.service('LocalizeServ', function ($http, $q) {
    this.drivers = {};
    this.getDrivers = function () {
        var defer = $q.defer();
        $http.get("http://212.227.108.163:20300/driver").success((function (srv) {
            return function (data) {
                srv.drivers = data;
                return defer.resolve(data);
            };
        })(this))
                .error(function (data) {

                    console.error(data);
                    return defer.reject(data);
                });
        return defer.promise;
    };
});