'use strict';

angular.module('public.sebmadeApp')
    .controller('PlayerCtrl', function ($scope, api, $routeParams, $location) {
        $scope.player = {};

        if ($routeParams.id) {
            api.getPlayerById($routeParams.id).success(function (data) {
                $scope.player = data;
            })
        }

        $scope.updatePlayer = function () {
            api.updatePlayer($scope.player).success(function (data) {
                $location.path("#/");
            });
        };

        $scope.addPlayer = function () {
            api.addPlayer($scope.player).success(function (data) {
                $location.path("#/");
            });
        };
    });
