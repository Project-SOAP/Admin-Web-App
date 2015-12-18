'use strict';

/* Services */

var soaServices = angular.module('soaServices', ['ngResource']);

soaServices.factory('Connect', ['$resource',
    function ($resource) {
        return $resource('phones/:phoneId.json', {}, {
            query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
        });
    }]);
