'use strict';

/* Controllers */

var LocalizeApp = angular.module('soaApp');

LocalizeApp.controller('LocalizeCtrl', ['$scope', '$location', '$interval', 'LocalizeServ',
    function ($scope, $loc, $interval, LocalizeServ) {
        // Redirect if no token in localStorage
        if (window.sessionStorage['token'] === undefined) {
            $loc.path("/home");
        }

        $scope.drivers = [];
        $scope.techniciens = [];

        // Insert of a map
        var map = L.map('map');
        map.setView([46.676, 2.186], 6);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'amarok.of66ain7',
            accessToken: 'pk.eyJ1IjoiYW1hcm9rIiwiYSI6ImNpaWJpaTExcjAwM212cmt5ZHVnejJldXIifQ.Dbzf4gP2FeSZKpTYcPgcSg'
        }).addTo(map);

        var warnMarker = L.icon({
            iconUrl: 'img/warn.png',
            iconSize: [20, 20], // size of the icon
            iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
            popupAnchor: [10, 2] // point from which the popup should open relative to the iconAnchor
        });

        var techMarker = L.icon({
            iconUrl: 'img/technician.png',
            iconSize: [35, 35], // size of the icon
            iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
            popupAnchor: [10, 2] // point from which the popup should open relative to the iconAnchor
        });



        var markersDrivers = [];
        var markersTechs = [];
        $interval(function () {
            LocalizeServ.getDrivers()
                    .then(function (data) {
                        $scope.datenow = new Date();
                        $scope.drivers = data;
                        for (var i = 0; i < $scope.drivers.length; i++) {
                            if (markersDrivers[i] !== undefined
                                    && $scope.drivers[i].Position.Latitude !== markersDrivers[i]._latlng.lat
                                    && $scope.drivers[i].Position.Longitude !== markersDrivers[i]._latlng.lng) {
                                map.removeLayer(markersDrivers[i]);
                            }
                            if (dateDiff(new Date($scope.drivers[i].updatedAt), new Date())) {
                                $scope.drivers[i].problem = true;
                                var marker = L.marker([$scope.drivers[i].Position.Latitude, $scope.drivers[i].Position.Longitude], {icon: warnMarker}).addTo(map);
                                markersDrivers.push(marker);
                            } else {
                                $scope.drivers[i].problem = false;
                                var marker = L.marker([$scope.drivers[i].Position.Latitude, $scope.drivers[i].Position.Longitude]).addTo(map);
                                markersDrivers.push(marker);
                            }

                            marker.bindPopup("<b>" + $scope.drivers[i].name + "</b></br>Société : " + $scope.drivers[i].society);
                        }
                    })
                    .catch(function (e) {
                        console.warn(e);
                    });
            LocalizeServ.getTechnician().then(function (data) {
                        $scope.techniciens = data;
                        for (var i = 0; i < $scope.techniciens.length; i++) {
                            if (markersTechs[i] !== undefined
                                    && $scope.techniciens[i].Position.Latitude !== markersTechs[i]._latlng.lat
                                    && $scope.techniciens[i].Position.Longitude !== markersTechs[i]._latlng.lng) {
                                map.removeLayer(markersDrivers[i]);
                            }
                            var marker = L.marker([$scope.techniciens[i].Position.Latitude, $scope.techniciens[i].Position.Longitude], {icon: techMarker}).addTo(map);
                            markersTechs.push(marker);
                        }
                    })
                    .catch(function (e) {
                        console.warn(e);
                    });
        }, 2000);

        $scope.user = {
            id: window.sessionStorage['id'],
            name: window.sessionStorage['name'],
            email: window.sessionStorage['email']
        };


        $scope.pushAlert = function (id) {

        };

    }]);

function dateDiff(date1, date2) {
    var diffMs = (date2 - date1); // milliseconds between now & Christmas
    var diffDays = Math.round(diffMs / 86400000); // days
    var diffHrs = (diffMs % 86400000) / 3600000; // hours
    if (diffDays > 0 || diffHrs >= 1) {
        return true;
    } else
        return false;

}