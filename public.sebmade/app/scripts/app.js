'use strict';

angular.module('public.sebmadeApp', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/player/:id', {
                templateUrl: 'views/player.html',
                controller: 'PlayerCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
