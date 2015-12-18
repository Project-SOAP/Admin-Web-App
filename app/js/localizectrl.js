'use strict';

/* Controllers */

var LocalizeApp = angular.module('LocalizeApp', []);

LocalizeApp.controller('LocalizeCtrl',
        function ($scope) {
            var map = L.map('map');
            map.setView([46.676, 2.186], 7);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'amarok.of66ain7',
                accessToken: 'pk.eyJ1IjoiYW1hcm9rIiwiYSI6ImNpaWJpaTExcjAwM212cmt5ZHVnejJldXIifQ.Dbzf4gP2FeSZKpTYcPgcSg'
            }).addTo(map);
        });