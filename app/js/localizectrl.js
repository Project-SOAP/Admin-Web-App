'use strict';

/* Controllers */

var LocalizeApp = angular.module('soaApp');

LocalizeApp.controller('LocalizeCtrl', ['$scope', '$location', 'LocalizeServ',
    function ($scope, $loc, LocalizeServ) {
        // Redirect if no token in localStorage
        if (window.sessionStorage['token'] === undefined) {
            $loc.path("/home");
        }

        io.socket.on('drivers', function (msg) {
            console.log('coucou bisou io socket')
            console.log(msg)
        });



        // Insert of a map
        var map = L.map('map');
        map.setView([46.676, 2.186], 7);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'amarok.of66ain7',
            accessToken: 'pk.eyJ1IjoiYW1hcm9rIiwiYSI6ImNpaWJpaTExcjAwM212cmt5ZHVnejJldXIifQ.Dbzf4gP2FeSZKpTYcPgcSg'
        }).addTo(map);

        $scope.drivers = LocalizeServ.drivers;
        //L.marker([44.8560, -0.5649]).addTo(map);

        $scope.user = {
            id: window.sessionStorage['id'],
            name: window.sessionStorage['name'],
            email: window.sessionStorage['email']
        };
    }]);