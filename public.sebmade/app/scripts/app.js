'use strict';

angular.module('public.sebmadeApp', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                //controller: 'MainCtrl'
            })
            .when('/addPlayer', {
                templateUrl: 'views/addPlayer.html',
                //controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
